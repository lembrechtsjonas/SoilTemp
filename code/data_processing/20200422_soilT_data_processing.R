library(data.table)
library(tidyverse)

setwd("/Users/johanvandenhoogen/ETH/Projects/soil_temperature/")

monthly_sites <- fread("data/20201215_SoilTemp_monthly_cleaned.csv") %>% 
  select(Plotcode, Longitude, Latitude, Month, MeanTemp, Min5Temp, Max95Temp, DaysMeasured, Height, ERA, deltaT) %>% 
  rename(date = Month) %>% 
  mutate(month = as.numeric(format(as.Date(date, format="%Y-%m-%d"),"%m"))) %>% 
  mutate(year = as.numeric(format(as.Date(date, format="%Y-%m-%d"),"%y"))) 

head(monthly_sites)

toSample <- monthly_sites %>%
  select(Plotcode, Longitude, Latitude) %>%
  rename(longitude = Longitude, latitude = Latitude) %>%
  unique()

# Write to file
fwrite(toSample, "data/20201215_SoilTSitesToSample.csv")

# After sampling (in GEE)
sampled_sites <- fread("data/sampled_data/20201215_SoilT_monthtlyVals_Sampled_gapfilled.csv", header =  T) %>% 
  select(-V1)

# Process dt
monthly_sites_sampled <- monthly_sites %>% 
  select(Plotcode, Height, deltaT, month, year) %>% 
  rowid_to_column() %>% 
  # filter(Plotcode != "NO_JL_NS.NO.04.1") %>% #Something is off with this plot's coordinates and name; remove until resolved in future version
  pivot_wider(names_from = "month",
              values_from = "deltaT") %>%
  rename(deltaT_01 = '1',
         deltaT_02 = '2',
         deltaT_03 = '3',
         deltaT_04 = '4',
         deltaT_05 = '5',
         deltaT_06 = '6',
         deltaT_07 = '7',
         deltaT_08 = '8',
         deltaT_09 = '9',
         deltaT_10 = '10',
         deltaT_11 = '11',
         deltaT_12 = '12') %>% 
  left_join(., sampled_sites, by = "Plotcode") %>%
  select(-rowid) %>% 
  as.data.frame() %>% mutate_at(vars(-one_of('Plotcode')), as.numeric) %>% 
  select(-Plotcode)

# Write to file
fwrite(monthly_sites_sampled, "data/sampled_data/20201215_monthly_sites_sampled_gapfilled_processed.csv")



######################################3


monthly_sites <- fread("data/SoilTemp_monthly_cleaned_wMinMax.csv") %>% 
  select(Plotcode, Longitude, Latitude, Month, MeanTemp, Min5Temp, Max95Temp, DaysMeasured, Height, ERA, deltaT, deltaT_TerraMax, deltaT_TerraMin) %>% 
  rename(date = Month) %>% 
  mutate(month = as.numeric(format(as.Date(date, format="%Y-%m-%d"),"%m"))) %>% 
  mutate(year = as.numeric(format(as.Date(date, format="%Y-%m-%d"),"%y"))) 

head(monthly_sites)


# After sampling (in GEE)
sampled_sites <- fread("data/sampled_data/20201215_SoilT_monthtlyVals_Sampled_gapfilled.csv", header =  T)

# Process dt
monthly_sites_sampled_deltaT_TerraMax <- monthly_sites %>% 
  select(Plotcode, Height, deltaT_TerraMax, month, year) %>% 
  rowid_to_column() %>% 
  pivot_wider(names_from = "month",
              values_from = "deltaT_TerraMax") %>%
  rename(deltaT_Max_01 = '1',
         deltaT_Max_02 = '2',
         deltaT_Max_03 = '3',
         deltaT_Max_04 = '4',
         deltaT_Max_05 = '5',
         deltaT_Max_06 = '6',
         deltaT_Max_07 = '7',
         deltaT_Max_08 = '8',
         deltaT_Max_09 = '9',
         deltaT_Max_10 = '10',
         deltaT_Max_11 = '11',
         deltaT_Max_12 = '12') %>% 
  left_join(., sampled_sites, by = "Plotcode") %>%
  select(-rowid) %>% 
  as.data.frame() %>% mutate_at(vars(-one_of('Plotcode')), as.numeric)  %>%
  select(-Plotcode)

# Write to file
fwrite(monthly_sites_sampled_deltaT_TerraMax, "data/sampled_data/20210122_SoilT_monthlyVals_Sampled_deltaT_Max.csv")

# Process dt
monthly_sites_sampled_deltaT_TerraMin <- monthly_sites %>% 
  select(Plotcode, Height, deltaT_TerraMin, month, year) %>% 
  rowid_to_column() %>% 
  pivot_wider(names_from = "month",
              values_from = "deltaT_TerraMin") %>%
  rename(deltaT_Min_01 = '1',
         deltaT_Min_02 = '2',
         deltaT_Min_03 = '3',
         deltaT_Min_04 = '4',
         deltaT_Min_05 = '5',
         deltaT_Min_06 = '6',
         deltaT_Min_07 = '7',
         deltaT_Min_08 = '8',
         deltaT_Min_09 = '9',
         deltaT_Min_10 = '10',
         deltaT_Min_11 = '11',
         deltaT_Min_12 = '12') %>% 
  left_join(., sampled_sites, by = "Plotcode") %>%
  select(-rowid) %>% 
  as.data.frame() %>% mutate_at(vars(-one_of('Plotcode')), as.numeric) %>%
  select(-Plotcode)

# Write to file
fwrite(monthly_sites_sampled_deltaT_TerraMin, "data/sampled_data/20210122_SoilT_monthlyVals_Sampled_deltaT_Min.csv")

