# Import the modules of interest
import pandas as pd
import subprocess
import tqdm
import time
import datetime
from pathlib import Path
import ee
from functools import partial
from contextlib import contextmanager
from ctypes import c_int
import multiprocessing
# from multiprocessing import Value, Lock, Process

ee.Initialize()

depth = [0,5]

def pipeline(month):
    # Configuration
    ####################################################################################
    # Input the name of the username that serves as the home folder for asset storage
    usernameFolderString = 'xxx'

    # Input the Cloud Storage Bucket that will hold the bootstrap collections when uploading them to Earth Engine
    # !! This bucket should be pre-created before running this script
    bucketOfInterest = 'xxx'

    # Input the normal wait time (in seconds) for "wait and break" cells
    normalWaitTime = 5

    # Input a longer wait time (in seconds) for "wait and break" cells
    longWaitTime = 10

    # Specify the column names where the latitude and longitude information is stored
    latString = 'Pixel_Lat'
    longString = 'Pixel_Long'

    # Input the name of the property that holds the CV fold assignment
    cvFoldString = 'CV_Fold'

    # depth string
    depthString = str(depth[0])+'_'+str(depth[1])+'cm_'

    # Input the name of the classification property
    classProperty = 'deltaT_' + str(month).zfill(2)

    # Input the name of the project folder inside which all of the assets will be stored
    # This folder will be generated automatically below, if it isn't yet present
    depthFolder = 'projectfolder/'+str(depth[0])+'_'+str(depth[1])+'cm'
    projectFolder = 'projectfolder/'+str(depth[0])+'_'+str(depth[1])+'cm'+'/'+classProperty

    ####################################################################################
    # Metric to use for sorting k-fold CV hyperparameter tuning
    sort_acc_prop = 'Mean_R2' # (either one of 'Mean_R2', 'Mean_MAE', 'Mean_RMSE')

    # Set k for k-fold CV
    k = 10

    # Make a list of the k-fold CV assignments to use
    kList = list(range(1,k+1))

    # Set number of trees in RF models
    nTrees = 250

    # Input the title of the CV Accuracy Feature Collection
    cvAccuracyFCNameString = "CV_Accuracy_FC"

    # Input the title of the CSV that will hold all of the data that has been given a CV fold assignment
    titleOfCSVWithCVAssignments = classProperty+"CV_Fold_Collection"

    # Write the name of a local staging area folder for outputted CSV's
    holdingFolder = #paste local path here

    # Create directory to hold training data
    Path(holdingFolder).mkdir(parents=True, exist_ok=True)


    ####################################################################################
    # Image export settings
    # Set pyramidingPolicy for exporting purposes
    pyramidingPolicy = 'mean'

    # Load a geometry to use for the export
    exportingGeometry = ee.Geometry.Polygon([[[-180, 88], [180, 88], [180, -88], [-180, -88]]], None, False);


    ####################################################################################
    # Bootstrapping inputs
    # Number of bootstrap iterations
    bootstrapIterations = 100

    # Generate the seeds for bootstrapping
    seedsToUseForBootstrapping = list(range(1, bootstrapIterations+1))

    # Input the name of a folder used to hold the bootstrap collections
    bootstrapCollFolder = 'Bootstrap_Collections'

    # Input the header text that will name each bootstrapped dataset
    fileNameHeader = classProperty+'BootstrapColl_'

    # Stratification inputs
    # Write the name of the variable used for stratification
    # !! This variable should be included in the input dataset
    stratificationVariableString = "Resolve_Biome"

    # Input the dictionary of values for each of the stratification category levels
    # !! This area breakdown determines the proportion of each biome to include in every bootstrap
    # !! collection; it was computed using the following script:
    # https://code.earthengine.google.com/d98223f98f6f11073aa21b059bf667d6
    strataDict = {
        1: 14.900835665820974,
        2: 2.941697660221864,
        3: 0.526059731441294,
        4: 9.56387696566245,
        5: 2.865354077500338,
        6: 11.519674266872787,
        7: 16.26999434439293,
        8: 8.047078485979089,
        9: 0.861212221078014,
        10: 3.623974712557433,
        11: 6.063922959332467,
        12: 2.5132866428302836,
        13: 20.037841544639985,
        14: 0.26519072167008,
    }

    ####################################################################################
    # Bash and Google Cloud Bucket settings
    # Specify the necessary arguments to upload the files to a Cloud Storage bucket
    # I.e., create bash variables in order to create/check/delete Earth Engine Assets

    # Specify main bash functions being used

    bashFunction_EarthEngine = '/opt/anaconda3/envs/ee/bin/earthengine'
    bashFunctionGSUtil = 'gsutil'

    # Specify the arguments to these functions
    arglist_preEEUploadTable = ['upload','table']
    arglist_postEEUploadTable = ['--x_column', longString, '--y_column', latString]
    arglist_preGSUtilUploadFile = ['cp']
    formattedBucketOI = 'gs://'+bucketOfInterest
    assetIDStringPrefix = '--asset_id='
    arglist_CreateCollection = ['create','collection']
    arglist_CreateFolder = ['create','folder']
    arglist_Detect = ['asset','info']
    arglist_Delete = ['rm','-r']
    stringsOfInterest = ['Asset does not exist or is not accessible']

    # Compose the arguments into lists that can be run via the subprocess module
    bashCommandList_Detect = [bashFunction_EarthEngine]+arglist_Detect
    bashCommandList_Delete = [bashFunction_EarthEngine]+arglist_Delete
    bashCommandList_CreateCollection = [bashFunction_EarthEngine]+arglist_CreateCollection
    bashCommandList_CreateFolder = [bashFunction_EarthEngine]+arglist_CreateFolder

    ####################################################################################
    # Covariate input settings
    # Input a list of the covariates being used
    staticCovarList = [
    'Aridity_Index',
    'PET',
    'EarthEnvTopoMed_1stOrderPartialDerivEW',
    'EarthEnvTopoMed_Elevation',
    'EarthEnvTopoMed_Roughness',
    'EarthEnvTopoMed_TerrainRuggednessIndex',
    'Population_Density',
    'GlobBiomass_AboveGroundBiomass',
    'Human_Development_Percentage',
    'LandCoverClass_Barren',
    'Nadir_Reflectance_Band1',
    'Nadir_Reflectance_Band2',
    'Nadir_Reflectance_Band3',
    'Nadir_Reflectance_Band4',
    'Nadir_Reflectance_Band5',
    'Nadir_Reflectance_Band6',
    'Nadir_Reflectance_Band7',
    'NDVI',
    'SG_Absolute_depth_to_bedrock',
    'SG_Bulk_density_005cm',
    'SG_Depth_to_bedrock',
    'SG_Sand_Content_005cm',
    'SG_SOC_Density_005cm',
    'SG_Soil_pH_H2O_005cm'
    ];

    # Monthly variable names
    monthly_vars = [
    "EarthEnvCloudCover_MODCF_monthlymean_"+str(month).zfill(2),
    "WorldClim2_H2OVaporPressure_Month"+str(month).zfill(2),
    "WorldClim2_SolarRadiation_Month"+str(month).zfill(2)
    ];

    # Cloud cover has NA values for December
    if month == 1 or month == 12:
        del monthly_vars[0]
    else:
        pass

    # Load the composite on which to perform the mapping, and subselect the bands of interest
    compositeToUse = ee.Image("xxx").select(staticCovarList+monthly_vars)

    # Monthly climate variables from CHELSA
    CHELSA_monthly = ee.Image('xxx'+str(month).zfill(2))

    # CHELSA variable names
    CHELSA_vars = CHELSA_monthly.bandNames().getInfo()

    # Monthly snow cover
    snowCover = ee.Image('xxx'+str(month).zfill(2)).rename("snowCover_"+str(month).zfill(2))

    # Snowcover variable name
    snowCover_var = "snowCover_"+str(month).zfill(2)

    # Construct final composite
    compositeToClassify = ee.Image.cat(
        compositeToUse,
        CHELSA_monthly,
        snowCover
        )

    # Full list of variables to be included
    covariateList = staticCovarList+monthly_vars+CHELSA_vars+[snowCover_var]


    ####################################################################################################################################################################
    # Start of modeling
    ####################################################################################################################################################################

    # Turn the folder string into an assetID and perform the folder creation
    assetIDToCreate_Folder = 'users/'+usernameFolderString+'/'+depthFolder
    print(assetIDToCreate_Folder,'being created...')

    # Create the folder within Earth Engine
    subprocess.run(bashCommandList_CreateFolder+[assetIDToCreate_Folder])
    while any(x in subprocess.run(bashCommandList_Detect+[assetIDToCreate_Folder],stdout=subprocess.PIPE).stdout.decode('utf-8') for x in stringsOfInterest):
        print('Waiting for asset to be created...')
        time.sleep(normalWaitTime)
    print('Asset created!')

    # Sleep to allow the server time to receive incoming requests
    time.sleep(normalWaitTime/2)

    # Turn the folder string into an assetID and perform the folder creation
    assetIDToCreate_Folder = 'users/'+usernameFolderString+'/'+projectFolder
    print(assetIDToCreate_Folder,'being created...')

    # Create the folder within Earth Engine
    subprocess.run(bashCommandList_CreateFolder+[assetIDToCreate_Folder])
    while any(x in subprocess.run(bashCommandList_Detect+[assetIDToCreate_Folder],stdout=subprocess.PIPE).stdout.decode('utf-8') for x in stringsOfInterest):
        print('Waiting for asset to be created...')
        time.sleep(normalWaitTime)
    print('Asset created!')

    # Sleep to allow the server time to receive incoming requests
    time.sleep(normalWaitTime/2)

    # Import the raw CSV being bootstrapped\
    rawPointCollection = pd.read_csv('data/sampled_data/20201215_monthly_sites_sampled_gapfilled_processed.csv', float_precision='round_trip')

    # Print basic information on the csv
    print('Original Collection', rawPointCollection.shape[0])

    # Remove aboveground observations
    rawPointCollection = rawPointCollection[rawPointCollection['Height'] <= 0]
    rawPointCollection['Depth'] = rawPointCollection['Height'].abs()

    # Add 0.1 to depth interval, to make sure upper limit is not included in training data
    if depth[0] == 5:
        depth[0] = 5.1
    else:
        pass

    # Filter by depth
    depthFilteredPointCollection = rawPointCollection[rawPointCollection['Depth'].between(depth[0], depth[1], inclusive=True)]
    print('Filtered by depth interval', depthFilteredPointCollection.shape[0])

    # Remove the "system:index" and rename the ".geo" column to "geo" and shuffle the data frame while setting a new index
    # (to ensure geographic clumps of points are not clumped in anyway
    # Drop NA observations in classProperty column
    fcToAggregate = depthFilteredPointCollection.sample(frac=1).reset_index(drop=True)
    # print(fcToAggregate.shape[0])

    # Pixel aggregation
    # Select variables to include
    preppedCollection = pd.DataFrame(fcToAggregate.groupby(['Pixel_Lat', 'Pixel_Long']).mean().to_records())[covariateList+["Resolve_Biome"]+[classProperty]+['Pixel_Lat', 'Pixel_Long']]
    print('Number of aggregated pixels', preppedCollection.shape[0])

    # Drop NAs
    print('Before dropping NAs', preppedCollection.shape[0])
    preppedCollection = preppedCollection.dropna(how='any')
    print('After dropping NAs', preppedCollection.shape[0])
    # print(preppedCollection.isna().sum())


    # Add fold assignments to each of the points, stratified by biome
    preppedCollection[cvFoldString] = (preppedCollection.groupby('Resolve_Biome').cumcount() % k) + 1

    # Write the CSV to disk and upload it to Earth Engine as a Feature Collection
    localPathToCVAssignedData = holdingFolder+'/'+titleOfCSVWithCVAssignments+'.csv'
    preppedCollection.to_csv(localPathToCVAssignedData,index=False)


    # Format the bash call to upload the file to the Google Cloud Storage bucket
    gsutilBashUploadList = [bashFunctionGSUtil]+arglist_preGSUtilUploadFile+[localPathToCVAssignedData]+[formattedBucketOI]
    subprocess.run(gsutilBashUploadList)
    print(titleOfCSVWithCVAssignments+' uploaded to a GCSB!')

    # Wait for a short period to ensure the command has been received by the server
    time.sleep(normalWaitTime/2)

    # Wait for the GSUTIL uploading process to finish before moving on
    while not all(x in subprocess.run([bashFunctionGSUtil,'ls',formattedBucketOI],stdout=subprocess.PIPE).stdout.decode('utf-8') for x in [titleOfCSVWithCVAssignments]):
        print('Not everything is uploaded...')
        time.sleep(normalWaitTime)
    print('Everything is uploaded; moving on...')


    # Upload the file into Earth Engine as a table asset
    assetIDForCVAssignedColl = 'users/'+usernameFolderString+'/'+projectFolder+'/'+titleOfCSVWithCVAssignments
    earthEngineUploadTableCommands = [bashFunction_EarthEngine]+arglist_preEEUploadTable+[assetIDStringPrefix+assetIDForCVAssignedColl]+[formattedBucketOI+'/'+titleOfCSVWithCVAssignments+'.csv']+arglist_postEEUploadTable
    subprocess.run(earthEngineUploadTableCommands)
    print('Upload to EE queued!')

    # Wait for a short period to ensure the command has been received by the server
    time.sleep(normalWaitTime/2)

    # !! Break and wait
    count = 1
    while count >= 1:
        taskList = [str(i) for i in ee.batch.Task.list()]
        subsetList = [s for s in taskList if classProperty in s]
        subsubList = [s for s in subsetList if any(xs in s for xs in ['RUNNING', 'READY'])]
        count = len(subsubList)
        print(datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S'), 'Number of running jobs:', count)
        time.sleep(normalWaitTime)
    print('Moving on...')


    # remove line below when un-commenting gc upload above
    assetIDForCVAssignedColl = 'users/'+usernameFolderString+'/'+projectFolder+'/'+titleOfCSVWithCVAssignments

    # Load the collection with the pre-assigned K-Fold assignments
    fcOI = ee.FeatureCollection(assetIDForCVAssignedColl)

    varsPerSplit_list = [2,3,4,5,6,7,8,9,10,11,12,13,14]
    leafPop_list = [2,3,4,5]
    classifierList = []

    for vps in varsPerSplit_list:
        for lp in leafPop_list:

            model_name = classProperty + '_rf_VPS' + str(vps) + '_LP' + str(lp)

            rf = ee.Feature(ee.Geometry.Point([0,0])).set('cName',model_name,'c',ee.Classifier.smileRandomForest(
            numberOfTrees=nTrees,
            variablesPerSplit=vps,
            minLeafPopulation=lp,
            bagFraction=0.632
            ).setOutputMode('REGRESSION'))

            classifierList.append(rf)

    # Define the R^2 function
    def coefficientOfDetermination(fcOI,propertyOfInterest,propertyOfInterest_Predicted):
        # Compute the mean of the property of interest
        propertyOfInterestMean = ee.Number(ee.Dictionary(ee.FeatureCollection(fcOI).select([propertyOfInterest]).reduceColumns(ee.Reducer.mean(),[propertyOfInterest])).get('mean'));

        # Compute the total sum of squares
        def totalSoSFunction(f):
            return f.set('Difference_Squared',ee.Number(ee.Feature(f).get(propertyOfInterest)).subtract(propertyOfInterestMean).pow(ee.Number(2)))
        totalSumOfSquares = ee.Number(ee.Dictionary(ee.FeatureCollection(fcOI).map(totalSoSFunction).select(['Difference_Squared']).reduceColumns(ee.Reducer.sum(),['Difference_Squared'])).get('sum'))

        # Compute the residual sum of squares
        def residualSoSFunction(f):
            return f.set('Residual_Squared',ee.Number(ee.Feature(f).get(propertyOfInterest)).subtract(ee.Number(ee.Feature(f).get(propertyOfInterest_Predicted))).pow(ee.Number(2)))
        residualSumOfSquares = ee.Number(ee.Dictionary(ee.FeatureCollection(fcOI).map(residualSoSFunction).select(['Residual_Squared']).reduceColumns(ee.Reducer.sum(),['Residual_Squared'])).get('sum'))

        # Finalize the calculation
        r2 = ee.Number(1).subtract(residualSumOfSquares.divide(totalSumOfSquares))

        return ee.Number(r2)

    # Define the RMSE function
    def RMSE(fcOI,propertyOfInterest,propertyOfInterest_Predicted):
        # Compute the squared difference between observed and predicted
        def propDiff(f):
            diff = ee.Number(f.get(propertyOfInterest)).subtract(ee.Number(f.get(propertyOfInterest_Predicted)))

            return f.set('diff', diff.pow(2))

        # calculate RMSE from squared difference
        rmse = ee.Number(fcOI.map(propDiff).reduceColumns(ee.Reducer.mean(), ['diff']).get('mean')).sqrt()

        return rmse

    # Define the MAE function
    def MAE(fcOI,propertyOfInterest,propertyOfInterest_Predicted):
        # Compute the absolute difference between observed and predicted
        def propDiff(f):
            diff = ee.Number(f.get(propertyOfInterest)).subtract(ee.Number(f.get(propertyOfInterest_Predicted)))

            return f.set('diff', diff.abs())

        # calculate RMSE from squared difference
        mae = ee.Number(fcOI.map(propDiff).reduceColumns(ee.Reducer.mean(), ['diff']).get('mean'))

        return mae

    # Make a feature collection from the k-fold assignment list
    kFoldAssignmentFC = ee.FeatureCollection(ee.List(kList).map(lambda n: ee.Feature(ee.Geometry.Point([0,0])).set('Fold',n)))

    # Define a function to take a feature with a classifier of interest
    def computeCVAccuracyAndRMSE(featureWithClassifier):
        # Pull the classifier from the feature
        cOI = ee.Classifier(featureWithClassifier.get('c'))

        # Create a function to map through the fold assignments and compute the overall accuracy
        # for all validation folds
        def computeAccuracyForFold(foldFeature):
            # Organize the training and validation data
            foldNumber = ee.Number(ee.Feature(foldFeature).get('Fold'))
            trainingData = fcOI.filterMetadata(cvFoldString,'not_equals',foldNumber)
            validationData = fcOI.filterMetadata(cvFoldString,'equals',foldNumber)

            # Train the classifier and classify the validation dataset
            trainedClassifier = cOI.train(trainingData,classProperty,covariateList)
            outputtedPropName = classProperty+'_Predicted'
            classifiedValidationData = validationData.classify(trainedClassifier,outputtedPropName)

            # Compute accuracy metrics
            r2ToSet = coefficientOfDetermination(classifiedValidationData,classProperty,outputtedPropName)
            rmseToSet = RMSE(classifiedValidationData,classProperty,outputtedPropName)
            maeToSet = MAE(classifiedValidationData,classProperty,outputtedPropName)
            return foldFeature.set('R2',r2ToSet).set('RMSE', rmseToSet).set('MAE', maeToSet)

        # Compute the accuracy values of the classifier across all folds
        accuracyFC = kFoldAssignmentFC.map(computeAccuracyForFold)
        meanAccuracy = accuracyFC.aggregate_mean('R2')
        sdAccuracy = accuracyFC.aggregate_total_sd('R2')
        meanRMSE = accuracyFC.aggregate_mean('RMSE')
        sdRMSE = accuracyFC.aggregate_total_sd('RMSE')
        meanMAE = accuracyFC.aggregate_mean('MAE')
        sdMAE= accuracyFC.aggregate_total_sd('MAE')

        # Compute the feature to return
        featureToReturn = featureWithClassifier.select(['cName']).set('Mean_R2',meanAccuracy,'StDev_R2',sdAccuracy).set('Mean_RMSE',meanRMSE,'StDev_RMSE',sdRMSE).set('Mean_MAE',meanMAE,'StDev_MAE',sdMAE)
        return featureToReturn


    classDf = pd.DataFrame(columns = ['Mean_R2', 'StDev_R2','Mean_RMSE', 'StDev_RMSE','Mean_MAE', 'StDev_MAE', 'cName'])

    for rf in tqdm.tqdm(classifierList):

        accuracy_feature = ee.Feature(computeCVAccuracyAndRMSE(rf))

        classDf = classDf.append(pd.DataFrame(accuracy_feature.getInfo()['properties'], index = [0]))

    classDfSorted = classDf.sort_values([sort_acc_prop], ascending = False)

    print('Top 5 grid search results:\n', classDfSorted.head(5))

    bestModelName = classDfSorted.iloc[0]['cName']

    print('Best model:', bestModelName)

    # Write model results to csv
    modelResults = pd.DataFrame({'time': datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S'),
                                 'depth_interval': depthString,
                                 'classProperty': classProperty,
                                 'bestModelName': bestModelName,
                                 'Mean_R2': classDfSorted.iloc[0]['Mean_R2'],
                                 'StDev_R2': classDfSorted.iloc[0]['StDev_R2'],
                                 'Mean_RMSE': classDfSorted.iloc[0]['Mean_RMSE'],
                                 'StDev_RMSE': classDfSorted.iloc[0]['StDev_RMSE'],
                                 'Mean_MAE': classDfSorted.iloc[0]['Mean_MAE'],
                                 'StDev_MAE': classDfSorted.iloc[0]['StDev_MAE']}, index = [0])

    with open('model_details.csv', 'a') as f:
        modelResults.to_csv(f, mode='a', header=f.tell()==0)

    # Variable importance metrics
    # Load the best model from the classifier list
    classifier = ee.Classifier(ee.Feature(ee.FeatureCollection(classifierList).
                                              filterMetadata('cName', 'equals', bestModelName).first()).get('c'))

    # Train the classifier with the collection
    trainedClassiferForSingleMap = classifier.train(fcOI, classProperty, covariateList)

    # Get the feature importance from the trained classifier and print
    # them to a .csv file and as a bar plot as .png file
    classifierDict = trainedClassiferForSingleMap.explain().get('importance')
    featureImportances = classifierDict.getInfo()
    featureImportances = pd.DataFrame(featureImportances.items(),
                                      columns=['Covariates', 'Feature_Importance']).sort_values(by='Feature_Importance',
                                                                                                ascending=False)
    featureImportances.to_csv('output/'+depthString+classProperty+'_featureImportances.csv')
    # print('Feature Importances: ', '\n', featureImportances)
    plt = featureImportances[:10].plot(x='Covariates', y='Feature_Importance', kind='bar', legend=False,
                                  title='Feature Importances')
    fig = plt.get_figure()
    fig.savefig('output/'+depthString+classProperty+'_FeatureImportances.png', bbox_inches='tight')

    # Classify the image
    classifiedImageSingleMap = compositeToClassify.classify(trainedClassiferForSingleMap,classProperty+'_Predicted')

    # Queue the export
    fullSingleImageExport = ee.batch.Export.image.toAsset(
        image = classifiedImageSingleMap.toFloat(),
        description = classProperty+'_Classified_Map',
        assetId = 'users/'+usernameFolderString+'/'+projectFolder+'/'+classProperty+'_Map',
        crs = 'EPSG:4326',
        crsTransform = '[0.008333333333333333,0,-180,0,-0.008333333333333333,90]',
        region = exportingGeometry,
        maxPixels = int(1e13),
        pyramidingPolicy = {".default": pyramidingPolicy}
    );
    fullSingleImageExport.start()
    print('Full_Single_Classified_Map'+' queued!')

    #################################################################################
    # Bootstrapping
    # Input the number of points to use for each bootstrap model: equal to number of observations in training dataset
    bootstrapModelSize = preppedCollection.shape[0]

    # Run a for loop to create multiple bootstrap iterations and upload them to the Google Cloud Storage Bucket
    # Create an empty list to store all of the file name strings being uploaded (for later use)
    fileNameList = []
    for n in seedsToUseForBootstrapping:
        # Perform the subsetting
        stratSample = preppedCollection.groupby(stratificationVariableString, group_keys=False).apply(lambda x: x.sample(n=int(round((strataDict.get(x.name)/100)*bootstrapModelSize)), replace=True, random_state=n))

        # Format the title of the CSV and export it to a holding location
        titleOfBootstrapCSV = fileNameHeader+str(n).zfill(3)
        fileNameList.append(titleOfBootstrapCSV)
        fullLocalPath = holdingFolder+'/'+titleOfBootstrapCSV+'.csv'
        stratSample.to_csv(holdingFolder+'/'+titleOfBootstrapCSV+'.csv',index=False)

        # Format the bash call to upload the files to the Google Cloud Storage bucket
        gsutilBashUploadList = [bashFunctionGSUtil]+arglist_preGSUtilUploadFile+[fullLocalPath]+[formattedBucketOI]
        subprocess.run(gsutilBashUploadList)
        print(titleOfBootstrapCSV+' uploaded to a GCSB!')

    # Wait for the GSUTIL uploading process to finish before moving on
    while not all(x in subprocess.run([bashFunctionGSUtil,'ls',formattedBucketOI],stdout=subprocess.PIPE).stdout.decode('utf-8') for x in fileNameList):
        print('Not everything is uploaded...')
        time.sleep(5)
    print('Everything is uploaded; moving on...')

    # Create a folder to house the bootstrapped feature collection
    # Turn the folder string into an assetID and perform the creation
    assetIDToCreate_Folder = 'users/'+usernameFolderString+'/'+projectFolder+'/'+bootstrapCollFolder
    print(assetIDToCreate_Folder,'being created...')

    # Create the image collection before classifying each of the bootstrap images
    subprocess.run(bashCommandList_CreateFolder+[assetIDToCreate_Folder])
    while any(x in subprocess.run(bashCommandList_Detect+[assetIDToCreate_Folder], stdout=subprocess.PIPE).stdout.decode('utf-8') for x in stringsOfInterest):
        print('Waiting for asset to be created...')
        time.sleep(normalWaitTime)
    print('Asset created!')

    # Sleep to allow the server time to receive incoming requests
    time.sleep(normalWaitTime)

    # Loop through the file names and upload each of them to Earth Engine
    for f in fileNameList:
        assetIDForBootstrapColl = 'users/'+usernameFolderString+'/'+projectFolder+'/'+bootstrapCollFolder
        gsStorageFileLocation = formattedBucketOI
        earthEngineUploadTableCommands = [bashFunction_EarthEngine]+arglist_preEEUploadTable+[assetIDStringPrefix+assetIDForBootstrapColl+'/'+f]+[gsStorageFileLocation+'/'+f+'.csv']+arglist_postEEUploadTable
        subprocess.run(earthEngineUploadTableCommands)
        print(f+' ingestion started!')
    print('All files are being ingested.')

    # !! Break and wait
    count = 1
    while count >= 1:
        taskList = [str(i) for i in ee.batch.Task.list()]
        subsetList = [s for s in taskList if classProperty in s]
        subsubList = [s for s in subsetList if any(xs in s for xs in ['RUNNING', 'READY'])]
        count = len(subsubList)
        print(datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S'), 'Number of running jobs:', count)
        time.sleep(normalWaitTime)
    print('Moving on...')

    # Load the best model from the classifier list
    classifierToBootstrap = ee.Classifier(ee.Feature(ee.FeatureCollection(classifierList).filterMetadata('cName','equals',bestModelName).first()).get('c'))

    fcList = []
    # Run a for loop to create multiple bootstrap iterations
    for n in seedsToUseForBootstrapping:

        # Format the title of the CSV and export it to a holding location
        titleOfColl = fileNameHeader+str(n).zfill(3)
        collectionPath = 'users/'+usernameFolderString+'/'+projectFolder+'/'+bootstrapCollFolder+'/'+titleOfColl

        # Load the collection from the path
        fcToTrain = ee.FeatureCollection(collectionPath)

        fcList.append(fcToTrain)


    def bootstrapFunc(fc):
        # Train the classifier with the collection
        trainedClassifer = classifierToBootstrap.train(fc,classProperty,covariateList)

        # Classify the image
        classifiedImage = compositeToClassify.classify(trainedClassifer,classProperty+'_Predicted')

        return classifiedImage

    meanImage = ee.ImageCollection.fromImages(list(map(bootstrapFunc, fcList))).reduce(
        reducer = ee.Reducer.mean()
    )

    upperLowerCIImage = ee.ImageCollection.fromImages(list(map(bootstrapFunc, fcList))).reduce(
        reducer = ee.Reducer.percentile([2.5,97.5],['lower','upper'])
    )

    stdDevImage = ee.ImageCollection.fromImages(list(map(bootstrapFunc, fcList))).reduce(
        reducer = ee.Reducer.stdDev()
    )

    finalImageToExport = ee.Image.cat(meanImage,
    upperLowerCIImage,
    stdDevImage)

    FinalBoostrapImageExport = ee.batch.Export.image.toAsset(
        image = finalImageToExport.toFloat(),
        description = classProperty+'_Bootstrapped_MultibandImage',
        assetId = 'users/'+usernameFolderString+'/'+projectFolder+'/'+classProperty+'_Bootstrapped_MultibandImage' ,
        crs = 'EPSG:4326',
        crsTransform = '[0.008333333333333333,0,-180,0,-0.008333333333333333,90]',
        region = exportingGeometry,
        maxPixels = int(1e13),
        pyramidingPolicy = {".default": pyramidingPolicy}
    );
    FinalBoostrapImageExport.start()

    print('Month', month, 'done, moving on')



monthList = list(range(1,13))
# depthList = [[0,5],[5,15]]

number_of_processes = 4

@contextmanager
def poolcontext(*args, **kwargs):
		"""This just makes the multiprocessing easier with a generator."""
		pool = multiprocessing.Pool(*args, **kwargs)
		yield pool
		pool.terminate()

if __name__ == '__main__':

		with poolcontext(number_of_processes) as pool:

				results = pool.map(pipeline, monthList)
