// DeltaT maps; replace username and projectfolder with respective paths
var deltaT_01 = ee.Image("users/username/projectfolder/0_5cm/deltaT_01/deltaT_01_Map");
var deltaT_02 = ee.Image("users/username/projectfolder/0_5cm/deltaT_02/deltaT_02_Map");
var deltaT_03 = ee.Image("users/username/projectfolder/0_5cm/deltaT_03/deltaT_03_Map");
var deltaT_04 = ee.Image("users/username/projectfolder/0_5cm/deltaT_04/deltaT_04_Map");
var deltaT_05 = ee.Image("users/username/projectfolder/0_5cm/deltaT_05/deltaT_05_Map");
var deltaT_06 = ee.Image("users/username/projectfolder/0_5cm/deltaT_06/deltaT_06_Map");
var deltaT_07 = ee.Image("users/username/projectfolder/0_5cm/deltaT_07/deltaT_07_Map");
var deltaT_08 = ee.Image("users/username/projectfolder/0_5cm/deltaT_08/deltaT_08_Map");
var deltaT_09 = ee.Image("users/username/projectfolder/0_5cm/deltaT_09/deltaT_09_Map");
var deltaT_10 = ee.Image("users/username/projectfolder/0_5cm/deltaT_10/deltaT_10_Map");
var deltaT_11 = ee.Image("users/username/projectfolder/0_5cm/deltaT_11/deltaT_11_Map");
var deltaT_12 = ee.Image("users/username/projectfolder/0_5cm/deltaT_12/deltaT_12_Map");


var deltaT_0_5cm_IC = ee.ImageCollection.fromImages([
      deltaT_01.rename('deltaT'),
      deltaT_02.rename('deltaT'),
      deltaT_03.rename('deltaT'),
      deltaT_04.rename('deltaT'),
      deltaT_05.rename('deltaT'), 
      deltaT_06.rename('deltaT'),
      deltaT_07.rename('deltaT'),
      deltaT_08.rename('deltaT'),
      deltaT_09.rename('deltaT'),
      deltaT_10.rename('deltaT'),
      deltaT_11.rename('deltaT'),
      deltaT_12.rename('deltaT')])

var deltaT_annual_0_5cm = deltaT_0_5cm_IC.reduce(ee.Reducer.mean()).rename("0_5cm_deltaT_annual")


// DeltaT Max
var deltaT_Max_01 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_01/deltaT_Max_01_Bootstrapped_MultibandImage").select("deltaT_Max_01_Predicted");
var deltaT_Max_02 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_02/deltaT_Max_02_Bootstrapped_MultibandImage").select("deltaT_Max_02_Predicted");
var deltaT_Max_03 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_03/deltaT_Max_03_Bootstrapped_MultibandImage").select("deltaT_Max_03_Predicted");
var deltaT_Max_04 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_04/deltaT_Max_04_Bootstrapped_MultibandImage").select("deltaT_Max_04_Predicted");
var deltaT_Max_05 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_05/deltaT_Max_05_Bootstrapped_MultibandImage").select("deltaT_Max_05_Predicted");
var deltaT_Max_06 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_06/deltaT_Max_06_Bootstrapped_MultibandImage").select("deltaT_Max_06_Predicted");
var deltaT_Max_07 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_07/deltaT_Max_07_Bootstrapped_MultibandImage").select("deltaT_Max_07_Predicted");
var deltaT_Max_08 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_08/deltaT_Max_08_Bootstrapped_MultibandImage").select("deltaT_Max_08_Predicted");
var deltaT_Max_09 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_09/deltaT_Max_09_Bootstrapped_MultibandImage").select("deltaT_Max_09_Predicted");
var deltaT_Max_10 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_10/deltaT_Max_10_Bootstrapped_MultibandImage").select("deltaT_Max_10_Predicted");
var deltaT_Max_11 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_11/deltaT_Max_11_Bootstrapped_MultibandImage").select("deltaT_Max_11_Predicted");
var deltaT_Max_12 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Max_12/deltaT_Max_12_Bootstrapped_MultibandImage").select("deltaT_Max_12_Predicted");

var deltaT_Max_0_5cm_IC = ee.ImageCollection.fromImages([
      deltaT_Max_01.rename('deltaT_Max'),
      deltaT_Max_02.rename('deltaT_Max'),
      deltaT_Max_03.rename('deltaT_Max'),
      deltaT_Max_04.rename('deltaT_Max'),
      deltaT_Max_05.rename('deltaT_Max'), 
      deltaT_Max_06.rename('deltaT_Max'),
      deltaT_Max_07.rename('deltaT_Max'),
      deltaT_Max_08.rename('deltaT_Max'),
      deltaT_Max_09.rename('deltaT_Max'),
      deltaT_Max_10.rename('deltaT_Max'),
      deltaT_Max_11.rename('deltaT_Max'),
      deltaT_Max_12.rename('deltaT_Max')])

var deltaT_Max_annual_0_5cm = deltaT_Max_0_5cm_IC.reduce(ee.Reducer.mean()).rename("0_5cm_deltaT_Max_annual")

// DeltaT Min
var deltaT_Min_01 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_01/deltaT_Min_01_Bootstrapped_MultibandImage").select("deltaT_Min_01_Predicted");
var deltaT_Min_02 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_02/deltaT_Min_02_Bootstrapped_MultibandImage").select("deltaT_Min_02_Predicted");
var deltaT_Min_03 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_03/deltaT_Min_03_Bootstrapped_MultibandImage").select("deltaT_Min_03_Predicted");
var deltaT_Min_04 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_04/deltaT_Min_04_Bootstrapped_MultibandImage").select("deltaT_Min_04_Predicted");
var deltaT_Min_05 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_05/deltaT_Min_05_Bootstrapped_MultibandImage").select("deltaT_Min_05_Predicted");
var deltaT_Min_06 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_06/deltaT_Min_06_Bootstrapped_MultibandImage").select("deltaT_Min_06_Predicted");
var deltaT_Min_07 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_07/deltaT_Min_07_Bootstrapped_MultibandImage").select("deltaT_Min_07_Predicted");
var deltaT_Min_08 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_08/deltaT_Min_08_Bootstrapped_MultibandImage").select("deltaT_Min_08_Predicted");
var deltaT_Min_09 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_09/deltaT_Min_09_Bootstrapped_MultibandImage").select("deltaT_Min_09_Predicted");
var deltaT_Min_10 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_10/deltaT_Min_10_Bootstrapped_MultibandImage").select("deltaT_Min_10_Predicted");
var deltaT_Min_11 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_11/deltaT_Min_11_Bootstrapped_MultibandImage").select("deltaT_Min_11_Predicted");
var deltaT_Min_12 = ee.Image("users/username/projectfolder/0_5cm/deltaT_Min_12/deltaT_Min_12_Bootstrapped_MultibandImage").select("deltaT_Min_12_Predicted");

var deltaT_Min_0_5cm_IC = ee.ImageCollection.fromImages([
      deltaT_Min_01.rename('deltaT_Min'),
      deltaT_Min_02.rename('deltaT_Min'),
      deltaT_Min_03.rename('deltaT_Min'),
      deltaT_Min_04.rename('deltaT_Min'),
      deltaT_Min_05.rename('deltaT_Min'), 
      deltaT_Min_06.rename('deltaT_Min'),
      deltaT_Min_07.rename('deltaT_Min'),
      deltaT_Min_08.rename('deltaT_Min'),
      deltaT_Min_09.rename('deltaT_Min'),
      deltaT_Min_10.rename('deltaT_Min'),
      deltaT_Min_11.rename('deltaT_Min'),
      deltaT_Min_12.rename('deltaT_Min')])

var deltaT_Min_annual_0_5cm = deltaT_Min_0_5cm_IC.reduce(ee.Reducer.mean()).rename("0_5cm_deltaT_Min_annual")

// CHELSA layers
var CHELSA_01 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_01").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 1);
var CHELSA_02 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_02").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 2);
var CHELSA_03 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_03").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 3);
var CHELSA_04 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_04").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 4);
var CHELSA_05 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_05").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 5);
var CHELSA_06 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_06").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 6);
var CHELSA_07 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_07").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 7);
var CHELSA_08 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_08").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 8);
var CHELSA_09 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_09").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 9);
var CHELSA_10 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_10").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 10);
var CHELSA_11 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_11").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 11);
var CHELSA_12 = ee.Image("users/username/000_CHELSA_monthly/CHELSA_monthly_12").rename(["CHELSA_tMax10", "CHELSA_tMin10", "CHELSA_temp10", "CHELSA_prec"]).set('month', 12);

var CHELSA_IC = ee.ImageCollection.fromImages(
  [CHELSA_01,
CHELSA_02,
CHELSA_03,
CHELSA_04,
CHELSA_05,
CHELSA_06,
CHELSA_07,
CHELSA_08,
CHELSA_09,
CHELSA_10,
CHELSA_11,
CHELSA_12]);

// Mean Soil temp = mean air temp + mean deltaT
var soilT_mean_01 = CHELSA_01.select('CHELSA_temp10').divide(10).add(deltaT_01).rename('soilT_Mean').set('month', 1);
var soilT_mean_02 = CHELSA_02.select('CHELSA_temp10').divide(10).add(deltaT_02).rename('soilT_Mean').set('month', 2);
var soilT_mean_03 = CHELSA_03.select('CHELSA_temp10').divide(10).add(deltaT_03).rename('soilT_Mean').set('month', 3);
var soilT_mean_04 = CHELSA_04.select('CHELSA_temp10').divide(10).add(deltaT_04).rename('soilT_Mean').set('month', 4);
var soilT_mean_05 = CHELSA_05.select('CHELSA_temp10').divide(10).add(deltaT_05).rename('soilT_Mean').set('month', 5);
var soilT_mean_06 = CHELSA_06.select('CHELSA_temp10').divide(10).add(deltaT_06).rename('soilT_Mean').set('month', 6);
var soilT_mean_07 = CHELSA_07.select('CHELSA_temp10').divide(10).add(deltaT_07).rename('soilT_Mean').set('month', 7);
var soilT_mean_08 = CHELSA_08.select('CHELSA_temp10').divide(10).add(deltaT_08).rename('soilT_Mean').set('month', 8);
var soilT_mean_09 = CHELSA_09.select('CHELSA_temp10').divide(10).add(deltaT_09).rename('soilT_Mean').set('month', 9);
var soilT_mean_10 = CHELSA_10.select('CHELSA_temp10').divide(10).add(deltaT_10).rename('soilT_Mean').set('month', 10);
var soilT_mean_11 = CHELSA_11.select('CHELSA_temp10').divide(10).add(deltaT_11).rename('soilT_Mean').set('month', 11);
var soilT_mean_12 = CHELSA_12.select('CHELSA_temp10').divide(10).add(deltaT_12).rename('soilT_Mean').set('month', 12);

var soilT_Mean_IC = ee.ImageCollection.fromImages(
  [soilT_mean_01,
   soilT_mean_02,
   soilT_mean_03,
   soilT_mean_04,
   soilT_mean_05,
   soilT_mean_06,
   soilT_mean_07,
   soilT_mean_08,
   soilT_mean_09,
   soilT_mean_10,
   soilT_mean_11,
   soilT_mean_12]);

// Max Soil temp = Max air temp + Max deltaT
var soilT_Max_01 = CHELSA_01.select('CHELSA_tMax10').divide(10).add(deltaT_Max_01).rename('soilT_Max').set('month', 1);
var soilT_Max_02 = CHELSA_02.select('CHELSA_tMax10').divide(10).add(deltaT_Max_02).rename('soilT_Max').set('month', 2);
var soilT_Max_03 = CHELSA_03.select('CHELSA_tMax10').divide(10).add(deltaT_Max_03).rename('soilT_Max').set('month', 3);
var soilT_Max_04 = CHELSA_04.select('CHELSA_tMax10').divide(10).add(deltaT_Max_04).rename('soilT_Max').set('month', 4);
var soilT_Max_05 = CHELSA_05.select('CHELSA_tMax10').divide(10).add(deltaT_Max_05).rename('soilT_Max').set('month', 5);
var soilT_Max_06 = CHELSA_06.select('CHELSA_tMax10').divide(10).add(deltaT_Max_06).rename('soilT_Max').set('month', 6);
var soilT_Max_07 = CHELSA_07.select('CHELSA_tMax10').divide(10).add(deltaT_Max_07).rename('soilT_Max').set('month', 7);
var soilT_Max_08 = CHELSA_08.select('CHELSA_tMax10').divide(10).add(deltaT_Max_08).rename('soilT_Max').set('month', 8);
var soilT_Max_09 = CHELSA_09.select('CHELSA_tMax10').divide(10).add(deltaT_Max_09).rename('soilT_Max').set('month', 9);
var soilT_Max_10 = CHELSA_10.select('CHELSA_tMax10').divide(10).add(deltaT_Max_10).rename('soilT_Max').set('month', 10);
var soilT_Max_11 = CHELSA_11.select('CHELSA_tMax10').divide(10).add(deltaT_Max_11).rename('soilT_Max').set('month', 11);
var soilT_Max_12 = CHELSA_12.select('CHELSA_tMax10').divide(10).add(deltaT_Max_12).rename('soilT_Max').set('month', 12);

var soilT_Max_IC = ee.ImageCollection.fromImages(
  [soilT_Max_01,
   soilT_Max_02,
   soilT_Max_03,
   soilT_Max_04,
   soilT_Max_05,
   soilT_Max_06,
   soilT_Max_07,
   soilT_Max_08,
   soilT_Max_09,
   soilT_Max_10,
   soilT_Max_11,
   soilT_Max_12]);

// Min Soil temp = Min air temp + Min deltaT
var soilT_Min_01 = CHELSA_01.select('CHELSA_tMin10').divide(10).add(deltaT_Min_01).rename('soilT_Min').set('month', 1);
var soilT_Min_02 = CHELSA_02.select('CHELSA_tMin10').divide(10).add(deltaT_Min_02).rename('soilT_Min').set('month', 2);
var soilT_Min_03 = CHELSA_03.select('CHELSA_tMin10').divide(10).add(deltaT_Min_03).rename('soilT_Min').set('month', 3);
var soilT_Min_04 = CHELSA_04.select('CHELSA_tMin10').divide(10).add(deltaT_Min_04).rename('soilT_Min').set('month', 4);
var soilT_Min_05 = CHELSA_05.select('CHELSA_tMin10').divide(10).add(deltaT_Min_05).rename('soilT_Min').set('month', 5);
var soilT_Min_06 = CHELSA_06.select('CHELSA_tMin10').divide(10).add(deltaT_Min_06).rename('soilT_Min').set('month', 6);
var soilT_Min_07 = CHELSA_07.select('CHELSA_tMin10').divide(10).add(deltaT_Min_07).rename('soilT_Min').set('month', 7);
var soilT_Min_08 = CHELSA_08.select('CHELSA_tMin10').divide(10).add(deltaT_Min_08).rename('soilT_Min').set('month', 8);
var soilT_Min_09 = CHELSA_09.select('CHELSA_tMin10').divide(10).add(deltaT_Min_09).rename('soilT_Min').set('month', 9);
var soilT_Min_10 = CHELSA_10.select('CHELSA_tMin10').divide(10).add(deltaT_Min_10).rename('soilT_Min').set('month', 10);
var soilT_Min_11 = CHELSA_11.select('CHELSA_tMin10').divide(10).add(deltaT_Min_11).rename('soilT_Min').set('month', 11);
var soilT_Min_12 = CHELSA_12.select('CHELSA_tMin10').divide(10).add(deltaT_Min_12).rename('soilT_Min').set('month', 12);

var soilT_Min_IC = ee.ImageCollection.fromImages(
  [soilT_Min_01,
   soilT_Min_02,
   soilT_Min_03,
   soilT_Min_04,
   soilT_Min_05,
   soilT_Min_06,
   soilT_Min_07,
   soilT_Min_08,
   soilT_Min_09,
   soilT_Min_10,
   soilT_Min_11,
   soilT_Min_12]);



Map.addLayer(CHELSA_IC.toBands(), {}, 'CHELSA_IC',false)
Map.addLayer(soilT_Mean_IC.toBands(), {}, 'soilT_Mean_IC',false)
Map.addLayer(soilT_Max_IC.toBands(), {}, 'soilT_Max_IC',false)
Map.addLayer(soilT_Min_IC.toBands(), {}, 'soilT_Min_IC',false)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BIO2 = Mean Diurnal Range (Mean of monthly (Max temp - Min temp))
var range_01 = soilT_Max_01.subtract(soilT_Min_01);
var range_02 = soilT_Max_02.subtract(soilT_Min_02);
var range_03 = soilT_Max_03.subtract(soilT_Min_03);
var range_04 = soilT_Max_04.subtract(soilT_Min_04);
var range_05 = soilT_Max_05.subtract(soilT_Min_05);
var range_06 = soilT_Max_06.subtract(soilT_Min_06);
var range_07 = soilT_Max_07.subtract(soilT_Min_07);
var range_08 = soilT_Max_08.subtract(soilT_Min_08);
var range_09 = soilT_Max_09.subtract(soilT_Min_09);
var range_10 = soilT_Max_10.subtract(soilT_Min_10);
var range_11 = soilT_Max_11.subtract(soilT_Min_11);
var range_12 = soilT_Max_12.subtract(soilT_Min_12);

var rangeIC = ee.ImageCollection.fromImages([
  range_01,
  range_02,
  range_03,
  range_04,
  range_05,
  range_06,
  range_07,
  range_08,
  range_09,
  range_10,
  range_11,
  range_12
  ])


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BIO 56

// BIO5 = Max Temperature of Warmest Month

// BIO6 = Min Temperature of Coldest Month

// >>> USE Min/Max SOIL TEMP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var monthDesignations = ee.Image([1,2,3,4,5,6,7,8,9,10,11,12]).toArray();


// Decide on the image collection of interest (wherein each image has a 
// 'month' property denoting the month of the year)
var collOfInterest_Max = soilT_Max_IC.select('soilT_Max');
var collOfInterest_Min = soilT_Min_IC.select('soilT_Min');
// print('Collection of Interest',collOfInterest);

// Check the month properties of each image
var monthList = collOfInterest_Min.toList(collOfInterest_Min.size()).map(function(image){
  return ee.Image(image).get('month');
});
print(monthList)

// Collect images into months
var monthImageColls_tMax = monthList.map(function(monthList){
  var monthsCollected = soilT_Max_IC.select('soilT_Max').filter(ee.Filter.eq('month',monthList));
  return monthsCollected;
});

var monthImageColls_tMin = monthList.map(function(monthList){
  var monthsCollected = soilT_Min_IC.select('soilT_Min').filter(ee.Filter.eq('month',monthList));
  return monthsCollected;
});

print(monthImageColls_tMax)
print(monthImageColls_tMin)

// Average the images into a single multiband image
var monthAverages_tMax = ee.ImageCollection(monthImageColls_tMax.map(function(monthlyColl){
  return ee.ImageCollection(monthlyColl).mean();
}));
var emptyImage_tMax = ee.Image([]);
var multibandImage_tMax = ee.Image(monthAverages_tMax.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImage_tMax));


// Average the images into a single multiband image
var monthAverages_tMin = ee.ImageCollection(monthImageColls_tMin.map(function(monthlyColl){
  return ee.ImageCollection(monthlyColl).mean();
}));
var emptyImage_tMin = ee.Image([]);
var multibandImage_tMin = ee.Image(monthAverages_tMin.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImage_tMin));

// Turn the image into an array image and sort the array to find the max/min value
var meanValueImage_tMax = multibandImage_tMax.toArray();
var meanValueImage_tMin = multibandImage_tMin.toArray();
//Map.addLayer(meanValueImage,{},'Mean Value Array Image',false);

print(meanValueImage_tMax)
print(meanValueImage_tMin)


// Sort the month designations by the month mean values
// to determine the highest / lowest month starting months
// var sortedArrayImage_tMax = monthDesignations.arraySort(meanValueImage_tMax);
// var sortedArrayImage_tMin = monthDesignations.arraySort(meanValueImage_tMin);

// var minArrayValue_tMax = sortedArrayImagetMax.arraySlice(0,0,1).arrayFlatten([['Minimum']]);
// var maxArrayValue_tMax = sortedArrayImagetMax.arraySlice(0,11).arrayFlatten([['Maximum']]);
// var minArrayValue_tMin = sortedArrayImagetMin.arraySlice(0,0,1).arrayFlatten([['Minimum']]);
// var maxArrayValue_tMin = sortedArrayImagetMin.arraySlice(0,11).arrayFlatten([['Maximum']]);

var sortedArrayImage_tMax = multibandImage_tMax.toArray().arraySort(meanValueImage_tMax);
var sortedArrayImage_tMin = multibandImage_tMin.toArray().arraySort(meanValueImage_tMin);


var BIO5 = sortedArrayImage_tMax.arraySlice(0,11).arrayFlatten([['SBIO5_Max_Temperature_of_Warmest_Month']])
print(BIO5)
var BIO6 = sortedArrayImage_tMin.arraySlice(0,0,1).arrayFlatten([['SBIO6_Min_Temperature_of_Coldest_Month']])
print(BIO6)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BIO 8 9

// BIO8 = Mean Temperature of Wettest Quarter

// BIO9 = Mean Temperature of Driest Quarter

// >>> USE MEAN SOIL TEMP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Create a list of possible monthly quarters
var quarterList = ee.List([[1,2,3],
[2,3,4],
[3,4,5],
[4,5,6],
[5,6,7],
[6,7,8],
[7,8,9],
[8,9,10],
[9,10,11],
[10,11,12],
[11,12,1],
[12,1,2]]);

// Create a "quarter designation image"
var quarterDesignations = ee.Image([1,2,3,4,5,6,7,8,9,10,11,12]).toArray();

// Decide on the image collection of interest (wherein each image has a 
// 'month' property denoting the month of the year)
var collOfInterest_prec = CHELSA_IC.select('CHELSA_prec');
print('Collection of Interest',collOfInterest_prec);

// Check the month properties of each image
var monthList = collOfInterest_prec.toList(collOfInterest_prec.size()).map(function(image){
  return ee.Image(image).get('month');
});
print(monthList)

// Collect images into quarters
var quarterImageColls = quarterList.map(function(monthList){
  var quartersCollected = collOfInterest_prec.filter(ee.Filter.inList('month', monthList));
  return quartersCollected;
});
// Average the quarterly images into a single multiband image
var quarterAverages = ee.ImageCollection(quarterImageColls.map(function(quarterlyColl){
  return ee.ImageCollection(quarterlyColl).mean();
}));
var emptyImage = ee.Image([]);
var multibandImage_precip = ee.Image(quarterAverages.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImage));
// print('Quarterly Averages (as multiband Image)',multibandImage);

// // Turn the image into an array image and sort the array to find the Max/Min value
var meanValueImage_precip = multibandImage_precip.toArray();

// Sort the quarter designations by the quarter mean values
// to deterMine the highest / lowest quarter starting months
var sortedArrayImage = quarterDesignations.arraySort(meanValueImage_precip);

// Slice the Minimum or Maximum value from the array as the quarterly designation of interest
// var MinArrayValue = sortedArrayImage.arraySlice(0,0,1).arrayFlatten([['Minimum']]);
// var MaxArrayValue = sortedArrayImage.arraySlice(0,11).arrayFlatten([['Maximum']]);

// Collect water vapor pressure images into quarters
var quarterImageCollsSoilT = quarterList.map(function(monthList){
  var quartersCollected = soilT_Mean_IC.filter(ee.Filter.inList('month',monthList));
  return quartersCollected;
});

// Average the quarterly images into a single multiband image
var quarterAveragesSoilT = ee.ImageCollection(quarterImageCollsSoilT.map(function(quarterlyColl){
  return ee.ImageCollection(quarterlyColl).mean();
}));
var emptyImageCHELSA = ee.Image([]);
var multibandImageSoilT = ee.Image(quarterAveragesSoilT.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImageCHELSA));
// print('Quarterly Averages (as multiband Image)',multibandImageSoilT);

// Turn the image into an array image and sort it using CHELSA precip 
var sortedArrayImageSoilT_forBIO89 = multibandImageSoilT.toArray().arraySort(meanValueImage_precip);

// Slice the Minimum or Maximum value from the SoilT array as the quarterly designation of interest 
var BIO8 = sortedArrayImageSoilT_forBIO89.arraySlice(0,11).arrayFlatten([['BIO8_meanT_wettestQ']])
var BIO9 = sortedArrayImageSoilT_forBIO89.arraySlice(0,0,1).arrayFlatten([['BIO9_meanT_driestQ']])



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BIO 10 11

// BIO10 = Mean Temperature of Warmest Quarter

// BIO11 = Mean Temperature of Coldest Quarter

// >> USE MEAN SOIL TEMP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a list of possible monthly quarters
var quarterList = ee.List([[1,2,3],
[2,3,4],
[3,4,5],
[4,5,6],
[5,6,7],
[6,7,8],
[7,8,9],
[8,9,10],
[9,10,11],
[10,11,12],
[11,12,1],
[12,1,2]]);

// Create a "quarter designation image"
var quarterDesignations = ee.Image([1,2,3,4,5,6,7,8,9,10,11,12]).toArray();
// //Map.addLayer(quarterDesignations,{},'Quarterly Designations Image',false);
 
// Decide on the image collection of interest (wherein each image has a 
// 'month' property denoting the month of the year)
var collOfInterest_soilT_mean = soilT_Mean_IC.select('soilT_Mean');
print('Collection of Interest',collOfInterest_soilT_mean);

// Check the month properties of each image
var monthList = collOfInterest_soilT_mean.toList(collOfInterest_soilT_mean.size()).map(function(image){
  return ee.Image(image).get('month');
});
print(monthList)

// Collect images into quarters
var quarterImageColls = quarterList.map(function(monthList){
  var quartersCollected = collOfInterest_soilT_mean.filter(ee.Filter.inList('month', monthList));
  return quartersCollected;
});
print('look hereQuarter Images',quarterImageColls);


// Average the quarterly images into a single multiband image
var quarterAverages = ee.ImageCollection(quarterImageColls.map(function(quarterlyColl){
  return ee.ImageCollection(quarterlyColl).mean();
}));
var emptyImage = ee.Image([]);
var multibandImage = ee.Image(quarterAverages.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImage));
print('Quarterly Averages (as multiband Image)',multibandImage);


// // Turn the image into an array image and sort the array to find the Max/Min value
var meanValueImage_CHELSA_temp = multibandImage.toArray();

// Sort the quarter designations by the quarter mean values
// to deterMine the highest / lowest quarter starting months
// var sortedArrayImage = quarterDesignations.arraySort(meanValueImage_CHELSA_temp);

// Slice the Minimum or Maximum value from the array as the quarterly
// designation of interest (per pixel)
// var MinArrayValue = sortedArrayImage.arraySlice(0,0,1).arrayFlatten([['Minimum']]);
// var MaxArrayValue = sortedArrayImage.arraySlice(0,11).arrayFlatten([['Maximum']]);

// Collect images into quarters
var quarterImageCollsSoilT = quarterList.map(function(monthList){
  var quartersCollected = soilT_Mean_IC.filter(ee.Filter.inList('month',monthList));
  return quartersCollected;
});

// Average the water vapor pressure quarterly images into a single multiband image
var quarterAveragesSoilT = ee.ImageCollection(quarterImageCollsSoilT.map(function(quarterlyColl){
  return ee.ImageCollection(quarterlyColl).mean();
}));
var emptyImage = ee.Image([]);
var multibandImageSoilT = ee.Image(quarterAveragesSoilT.iterate(function(image, result) {
	return ee.Image(result).addBands(image);
}, emptyImage));
print('Quarterly Averages (as multiband Image)',multibandImageSoilT);


// Turn the CHELSA into an array image and sort it using the collection of interest (from above)
var sortedArrayImageSoilT_forBIO1011 = multibandImageSoilT.toArray().arraySort(meanValueImage_CHELSA_temp);

var BIO10 = sortedArrayImageSoilT_forBIO1011.arraySlice(0,11).arrayFlatten([['BIO10_meanT_warmestQ']]).rename('SBIO10_Mean_Temperature_of_Warmest_Quarter')
var BIO11 = sortedArrayImageSoilT_forBIO1011.arraySlice(0,0,1).arrayFlatten([['BIO11_meanT_coldestQ']]).rename('SBIO11_Mean_Temperature_of_Coldest_Quarter')





// Bounding box for the map export
var unboundedGeo = ee.Geometry.Polygon([-180, 88, 0, 88, 180, 88, 180, -88, 0, -88, -180, -88], null, false);


// Construct final BIO layers

 // BIO1 = Annual Mean Temperature
var BIO1 = soilT_Mean_IC.reduce(ee.Reducer.mean()).rename('SBIO1_Annual_Mean_Temperature')

// BIO2 = Mean Diurnal Range (Mean of monthly (Max temp - Min temp))
var BIO2 = rangeIC.mean().rename('SBIO2_Mean_Diurnal_Range')

// BIO4 = Temperature Seasonality (standard deviation ×100)
var BIO4 = soilT_Mean_IC.reduce(ee.Reducer.stdDev()).rename('SBIO4_Temperature_Seasonality').multiply(100)

// BIO7 = Temperature Annual Range (BIO5-BIO6)
var BIO7 = BIO5.subtract(BIO6).rename('SBIO7_Temperature_Annual_Range')


// BIO3 = Isothermality (BIO2/BIO7) (×100)
var BIO3 = BIO2.divide(BIO7).multiply(100).rename('SBIO3_Isothermality')




var finalImageToExport = ee.Image.cat(
  BIO1, BIO2, BIO3, BIO4, BIO5, BIO6, BIO7, BIO8, BIO9, BIO10, BIO11).rename(
'SBIO1_Annual_Mean_Temperature',
'SBIO2_Mean_Diurnal_Range',
'SBIO3_Isothermality',
'SBIO4_Temperature_Seasonality',
'SBIO5_Max_Temperature_of_Warmest_Month',
'SBIO6_Min_Temperature_of_Coldest_Month',
'SBIO7_Temperature_Annual_Range',
'SBIO8_Mean_Temperature_of_Wettest_Quarter',
'SBIO9_Mean_Temperature_of_Driest_Quarter',
'SBIO10_Mean_Temperature_of_Warmest_Quarter',
'SBIO11_Mean_Temperature_of_Coldest_Quarter'
)

// Export the image of interest
Export.image.toAsset({
	image: finalImageToExport.toFloat(),
	description: 'soil_bioclim_export_0_5cm',
	assetId: 'users/username/projectfolder/soil_bioclim/SBIO_v1_0_5cm',
  crs: "EPSG:4326",
  crsTransform: [0.008333333333333333,0,-180,0,-0.008333333333333333,90],
	region: unboundedGeo,
	maxPixels: 1e13
});

Map.addLayer(finalImageToExport, {}, "final bioclim collection")





// Export the image of interest
Export.image.toDrive({
	image: BIO1.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO1_0_5cm_Annual_Mean_Temperature',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});

// Export the image of interest
Export.image.toDrive({
	image: BIO4.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO4_0_5cm_Temperature_Seasonality',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO5.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO5_0_5cm_MaxT_warmestMonth_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO6.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO6_0_5cm_MinT_coldestMonth_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});



// Export the image of interest
Export.image.toDrive({
	image: BIO7.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO7_0_5cm_annual_range_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});



// Export the image of interest
Export.image.toDrive({
	image: BIO3.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO3_0_5cm_Isothermality_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO2.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO2_0_5cm_mean_diurnal_range_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO8.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO8_0_5cm_meanT_wettestQ_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO9.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO9_0_5cm_meanT_driestQ_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO10.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO10_0_5cm_meanT_warmestQ_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});


// Export the image of interest
Export.image.toDrive({
	image: BIO11.multiply(100).toInt().toFloat().divide(100),
	description: 'SBIO11_0_5cm_meanT_coldestQ_5km',
	folder:'soil_temperature',
  crs: "EPSG:4326",
  crsTransform: [0.04166666666666667,0,-180,0,-0.04166666666666667,90],
	region: unboundedGeo,
	maxPixels: 1e13
});

