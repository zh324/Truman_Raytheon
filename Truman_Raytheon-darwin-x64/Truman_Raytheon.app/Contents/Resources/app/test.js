var faker = require('faker');
var fs = require('fs');
var str = "";

for (var i=0; i<200; i++)
    str += faker.name.firstName() + '/t' + faker.name.lastName() + '/t' + faker.internet.email() + '/t' + faker.name.jobTitle() + '/t' 

fs.writeFile('/Users/z-boy/Documents/Class_Notes_Fall_2017/shoppinglist/test.txt')