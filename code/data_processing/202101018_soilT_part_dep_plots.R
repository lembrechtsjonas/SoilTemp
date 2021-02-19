library(h2o)
library(data.table)
library(tidyverse)

setwd("/Users/johanvandenhoogen/ETH/Projects/soil_temperature")

# Initiate the H2O cluster
localH2O <- h2o.init(nthreads = 6, max_mem_size = '600g', ignore_config = TRUE)

model_details <- fread("model_details.csv")

depthList <- c("0_5cm_", "5_15cm_")
monthList <- seq(1,12,1)

for (depth_int in depthList){
  for (month in monthList){
    
    # Name of the dependent variable
    varToModel <- sprintf("deltaT_%02d", month)
    
    training_data <- fread(paste0("/Users/johanvandenhoogen/ETH/Projects/soil_temperature/data/training_data/",depth_int,"/",varToModel,"/",varToModel,"CV_Fold_Collection.csv"))
    
    bandNames <- colnames(training_data %>% select(-Resolve_Biome, -varToModel, -Pixel_Lat, -Pixel_Long, -CV_Fold))
    
    # Select the bands / covariates from the regression matrix, in addition to the dependent variable of interest
    RegressionMatrix <- training_data %>% 
      select(bandNames, varToModel)
    
    # Import the regression matrix
    regMatrixH2O <- as.h2o(RegressionMatrix, destination_frame = "regMatrixH2O")
    
    bestModelName <- model_details %>% filter(depth_interval == depth_int, classProperty == varToModel) %>% pull(bestModelName)
    
    leafPop <- bestModelName %>% str_sub(-1)
    varPerSplit <- bestModelName %>% str_remove(varToModel) %>% str_remove("_rf_VPS") %>% str_remove(paste0("_LP",leafPop))
    
    rf_model <- h2o.randomForest(
      y = varToModel,
      training_frame = regMatrixH2O,
      ntrees = 250, 
      mtries = as.integer(varPerSplit),
      min_rows = as.integer(leafPop),
      sample_rate = 0.632,
      nfolds = 10,
      seed = 123)
    
    # top_preds <- rf_model@model$variable_importances %>% top_n(scaled_importance, n = 10) %>% pull(variable) 
    top_preds <- fread(paste0("/Users/johanvandenhoogen/polybox/soil_temperature/supplemental_files/FigS8_varImp/",depth_int, varToModel,"_featureImportances.csv")) %>% 
      top_n(Feature_Importance, n = 10) %>% pull(Covariates)
    
    pdp <- h2o.partialPlot(rf_model, data = regMatrixH2O, cols = top_preds, plot_stddev = F, plot = F, nbins = nrow(regMatrixH2O))
    
    pdp_df <- pdp %>% bind_rows(pdp, .id = "column_label") %>% 
      select(-column_label) %>% 
      pivot_longer(cols = c(-mean_response, -stddev_response, -std_error_mean_response),
                   names_to = "variable") %>% 
      na.omit()
    
    pdp <- pdp_df %>% ggplot(aes(x = value, y = mean_response)) +
      geom_line() +
      facet_wrap(vars(variable), nrow = 3, scales = "free") 
    
    ggsave(filename = paste0("exports/part_dep_plots/", depth_int, varToModel, "_pdp.pdf"), device = "pdf", width = 24, height = 16, units = "cm", plot = pdp, dpi = 300)
  }
}






