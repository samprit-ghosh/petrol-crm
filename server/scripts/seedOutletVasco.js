import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

const seedOutlets = async () => {
    try {
        const VASCO_ZONE_ID = new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e5");

        const rawData = {
            outlets: [
                {
                    "region": "Vasco RO",
                    "name": "M/S ARYADURGA SERVICE STATION,CANCO",
                    "sapCode": "41050977",
                    "location": "HP PETROL PUMP, Survey No- 191/6, Goa-Mumbai Highway, NH66, Village - Gudi Canacona, Taluka - Cancacona, Dist.- South Goa, Goa - 403702",
                    "district": "South Goa",
                    "dealer": {
                        "name": "Pushkar R. Prabhudessai",
                        "mobile": "NA",
                        "email": "aryadurgaservicestation@gmail.com"
                    },
                    "roManager": {
                        "name": "Sarang Bale",
                        "email": "bale.sanang31@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 30,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S ASHOKA PETROLEUM,ARLEM", "M/S FURTADO FUEL CENTRE,NAVELIM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHRI DATTAPRASAD S STATION,COLV",
                    "sapCode": "41051115",
                    "location": "HP Petrol Pump, Survey NO. 203/4, 424/2, 3 & 6, Chalta No-20 & 20A, Goa-Mumbai Highway, NH66, Village - Colvale, Taluka-Bardez, Dist.- North Goa, Goa – 403507",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Abhijeet Bhangle",
                        "mobile": "7507558301",
                        "email": "sdsshpcl@gmail.com"
                    },
                    "roManager": {
                        "name": "Vijay Kamble",
                        "email": "sdsshpcl@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 40,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 40,
                    "nearbyOutlets": ["ADHOC SHETGAONKAR PETROLEUM", "M/S SHETGAONKAR PETROLEUM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S MAPUSA SERVICE STATION,MAPUSA",
                    "sapCode": "41050578",
                    "location": "HP Petrol Pump, Plot No. 321, Near Gandhi Circle, Mapusa, Taluka - Bardez, Dist. - North Goa, Goa - 403507",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Roque Carvalho",
                        "mobile": "7249167917",
                        "email": "mapusaservicestation@gmail.com"
                    },
                    "roManager": {
                        "name": "Ashish Barapatre",
                        "email": "mapusaservicestation@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 22,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S RANE & RAUT UDYOG,DODAMARG"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S GREGORY GOMES,OLD GOA",
                    "sapCode": "41050645",
                    "location": "HP Petrol Pump, Survey No- 95/4, NH748, Ella, Near Gandhii Circle, A/P. - Old Goa, Taluka - Tiswadi, Dist.- North Goa, Goa - 403402",
                    "district": "North Goa",
                    "dealer": {
                        "name": "MR Edwin Gomes",
                        "mobile": "9822102896",
                        "email": "greautomobile@yahoo.co.in"
                    },
                    "roManager": {
                        "name": "Shivdas Naik",
                        "email": "shivdasmarch07@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S CHAMUNDESHWARI PETROLEUMS,NERUL", "M/S RAVINDRA PETROLEUM,TIVREM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S ASHOKA PETROLEUM,ARLEM",
                    "sapCode": "41043836",
                    "location": "HP Petrol Pump, Chalta 5 Of PT Sheet No. 57, Margao Bypass Road, Fatorda, Village-Arlem, Margao, Taluka - Salcete, Dist.- South Goa, Goa - 403602.",
                    "district": "South Goa",
                    "dealer": {
                        "name": "Sahit Korgaonker",
                        "mobile": "8408064629",
                        "email": "ashoka_petroleum@yahoo.com"
                    },
                    "roManager": {
                        "name": "Sagar Misal",
                        "email": "ashoka_petroleum@yahoo.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 30,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S ARYADURGA SERVICE STATION,CANCO", "M/S FURTADO FUEL CENTRE,NAVELIM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S CHAMUNDESHWARI PETROLEUMS,NERUL",
                    "sapCode": "41043851",
                    "location": "HP Petrol Pump, Survey No. 84/6, A/P. - Nerul, Dist.- North Goa, Goa - 403114",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Prasad P. Govekar",
                        "mobile": "9922484010",
                        "email": "prasadgovekar77@gmail.com"
                    },
                    "roManager": {
                        "name": "Prakash A. Noronha",
                        "email": "prakashnorpnha17@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S GREGORY GOMES,OLD GOA", "M/S RAVINDRA PETROLEUM,TIVREM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S FUEL POINT,VASCO DA GAMA",
                    "sapCode": "41043875",
                    "location": "HP Petrol Pump, Mundvel, Vasco-Da-Gama, Taluka - Mormugao, Dist. - South Goa, Goa - 403802",
                    "district": "South Goa",
                    "dealer": {
                        "name": "Sunil Morajkar",
                        "mobile": "9822127899",
                        "email": "fuelpointvasco@gmail.com"
                    },
                    "roManager": {
                        "name": "Prakash Naik",
                        "email": "fuelpointvasco@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/S KAVLEKARS FUEL STATION,SANCOALE"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S RAVINDRA PETROLEUM,TIVREM",
                    "sapCode": "41043883",
                    "location": "HP Petrol Pump, Survey No 28/1-B, Marcel-Tivrem Road, Tivrem, Village - Zuwarwada Marcela, Tal-Ponda, North Goa, Goa - 403107",
                    "district": "North Goa",
                    "dealer": {
                        "name": "AMIT KHOLKAR",
                        "mobile": "8888832661",
                        "email": "arkholkar21@rediffmail.com"
                    },
                    "roManager": {
                        "name": "MAYUR GAUDE",
                        "email": "ravindrapetroleum@rediffmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S GREGORY GOMES,OLD GOA", "M/S CHAMUNDESHWARI PETROLEUMS,NERUL"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S KAVLEKARS FUEL STATION,SANCOALE",
                    "sapCode": "41044144",
                    "location": "HP Petrol Pump, SURVEY NO. 64/3, NH17B, Opposite Metastrips, Airport Road, Sancoale, Mormugao, Dist.- South Goa, Goa - 403710",
                    "district": "South Goa",
                    "dealer": {
                        "name": "Siddesh Kavlekar",
                        "mobile": "9890018499",
                        "email": "siddeshkavlekar@yahoo.co.in"
                    },
                    "roManager": {
                        "name": "Sateri Gore",
                        "email": "kavlekarsfuelstation@yahoo.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 29,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 35,
                    "nearbyOutlets": ["M/S FUEL POINT,VASCO DA GAMA"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S KAVLEKAR PETROLEUM,PONDA",
                    "sapCode": "41042512",
                    "location": "HP Petrol Pump, Survey No- 34/1, Ponda Market Road, A/P.- Ponda, Near Old Busstand, Sadar, Tal-Ponda, Dist. - North Goa, Goa - 403401",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Seema Kelu Kavlekar",
                        "mobile": "9420979651",
                        "email": "kavlekarpetroleum@gmail.com"
                    },
                    "roManager": {
                        "name": "Kaustubh Kavlekar",
                        "email": "kaustubhkavlekar91@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 24,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S SILCA FUELS"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S FURTADO FUEL CENTRE,NAVELIM",
                    "sapCode": "41044692",
                    "location": "HP Petrol Pump, Survey No- 77/9 & 77/13, Goa-Mumbai Highway, NH66, Village - Navelim, Taluka-Salcete, District-South Goa, Goa - 403707",
                    "district": "South Goa",
                    "dealer": {
                        "name": "Avertano Furtado",
                        "mobile": "9822151789",
                        "email": "Furtadofuelcentre@gamil.com"
                    },
                    "roManager": {
                        "name": "Shannon Furtado",
                        "email": "Shanon66furtado@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 30,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S ARYADURGA SERVICE STATION,CANCO", "M/S ASHOKA PETROLEUM,ARLEM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SILCA FUELS",
                    "sapCode": "41002042",
                    "location": "HP PETROL PUMP, SURVEY NO 163/1-A, VILLAGE LOUTOLIM, TALUKA - SALCETE, DIST.- SOUTH GOA, GOA - 403718",
                    "district": "South Goa",
                    "dealer": {
                        "name": "RAVINDRA J CABRAL",
                        "mobile": "9822131583",
                        "email": "silcafuels@gmail.com"
                    },
                    "roManager": {
                        "name": "DADAPIR KARAJGI",
                        "email": "karazgidadapir0@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S KAVLEKAR PETROLEUM,PONDA"]
                },
                {
                    "region": "Vasco RO",
                    "name": "ADHOC SHETGAONKAR PETROLEUM",
                    "sapCode": "41077414",
                    "location": "HP Petrol Pump, Goa Tourism Fuel Station And Information Center, A/P. - Virnoda - Pernem, Dist. - North Goa, Goa - 403512",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Anuj Shetgaonkar",
                        "mobile": "7798422434",
                        "email": "Anujshetgaonkar96@gmail.com"
                    },
                    "roManager": {
                        "name": "Krishna Bhat",
                        "email": "Krushnabhat50@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 5,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S SHETGAONKAR PETROLEUM", "M/S SHRI DATTAPRASAD SERVICE STATION,COLV"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHETGAONKAR PETROLEUM",
                    "sapCode": "41036092",
                    "location": "HP PETROL PUMP, SURVEY NO 315 PART 5, VILLAGE MANDREM, TALUKA PERNEM, DIST.- NORTH GOA, GOA - 403512",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Anuj Shetgaonkar",
                        "mobile": "7798422434",
                        "email": "Anujshetgaonkar96@gmail.com"
                    },
                    "roManager": {
                        "name": "Rajat Shetgaonkar",
                        "email": "Rajatshetgaonkar62@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S SHRI DATTAPRASAD SERVICE STATION,COLV", "ADHOC SHETGAONKAR PETROLEUM"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S RANE & RAUT UDYOG,DODAMARG",
                    "sapCode": "41043841",
                    "location": "HP Petrol Pump, A/P. - Latabarcem, Dodamarg, Dist. - North Goa, Goa - 403503",
                    "district": "North Goa",
                    "dealer": {
                        "name": "Sanjay Rane",
                        "mobile": "9422444619",
                        "email": "ranesanjay26@yahoo.in"
                    },
                    "roManager": {
                        "name": "Mr. Vaibhav Naik",
                        "email": "Sanjayrane5797@gmail.com"
                    },
                    "saName": "Vasco Retail S.A.",
                    "salesOfficer": {
                        "name": "Mayank Mittal",
                        "mobile": "7814801978",
                        "email": "Mayank.Mittal@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S MAPUSA SERVICE STATION,MAPUSA"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S A G KORGAONKAR & SONS,SHIROLI N",
                    "sapCode": "41053133",
                    "location": "HP Petrol Pump, Survey No. 144, Pune Bangalore Road, Shiroli naka, NH4, A/P. - Shiroli, Taluka - Hathkanangale, Dist.- Kolhapur, M.S. - 416112",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Aniket Korgaonkar",
                        "mobile": "9860325575",
                        "email": "korgaonkar.aniket@gmail.com"
                    },
                    "roManager": {
                        "name": "Aniket",
                        "email": "aniketpatil4339@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 22,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "ADHOC TARE FUELS",
                    "sapCode": "41072953",
                    "location": "HP Petrol Pump, Kolhapur Miraj Road, A/P. - Sambhajipur, Jaisinghpur, Taluka - Shirol, Dist.- Kolhapur, M.S. - 416101,",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Snehal Tare",
                        "mobile": "8605763322",
                        "email": "adhoctarefuels@gmail.com"
                    },
                    "roManager": {
                        "name": "Manohar Khondre",
                        "email": "mkhondre96@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S MANGAVE AUTOMOBILES",
                    "sapCode": "41053282",
                    "location": "HP Petrol Pump, Kolhapur Miraj Road, Near Dharamnagar Phata, A/P.- Kondigree, Taluka - Shirol, Dist.- Kolhapur, M.S.- 416101",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Harshad Managave",
                        "mobile": "9422076322",
                        "email": "harshad_panthera@hotmail.com"
                    },
                    "roManager": {
                        "name": "Prathamesh Pandav",
                        "email": "harshad_panthera@hotmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S JAJAL AUTOMOTIVES,KAGAL",
                    "sapCode": "41000010",
                    "location": "HP Petrol Pump, NH4, A/P. - Vikaswadi, Taluka - Karveer, Dist. - Kolhapur, M.S. - 416234",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Rajeev Jajal",
                        "mobile": "9922917100",
                        "email": "jajalauto@gmail.com"
                    },
                    "roManager": {
                        "name": "Uttam Kadam",
                        "email": "jajalauto@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SUDARSHAN PETROLEUM CENTRE,GOKU",
                    "sapCode": "41052948",
                    "location": "HP Petrol Pump, Gat No- 217, Pune Banglore Road, NH48, Village - Gokulshirgaon, Taluka - Karveer, District-Kolhapur, M.S. - 416234",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "shila prakash patil",
                        "mobile": "9975950559",
                        "email": "sudarshan.petroleum@gmail.com"
                    },
                    "roManager": {
                        "name": "Priya Rajendra Patil",
                        "email": "priyariyapatil9850@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 30,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S POPULAR PETROL SUPPLY CO,KOLHAP",
                    "sapCode": "41050554",
                    "location": "HP Petrol Pump, Survey No- 204, E Ward, Station Road, Town - Kolhapur, Taluka – Karveer, Dist.- Kolhapur, M.S. - 416001",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Vikas Shah",
                        "mobile": "9423040700",
                        "email": "vikas260568@gmail.com"
                    },
                    "roManager": {
                        "name": "Jotiram Chavan",
                        "email": "pritivikas007@yahoo.co.in"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 9,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S LAXMI AUTO SERVICES,KAWALA NAKA",
                    "sapCode": "41050557",
                    "location": "HP Petrol Pump, 517/E, Kawala naka, Tararani Chowk, Kolhapur, Dist.- Kolhapur, M.S. - 416001",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Nikhil Ingavale",
                        "mobile": "9922927070",
                        "email": "nikhil7070@gmail.com"
                    },
                    "roManager": {
                        "name": "Anil Patil",
                        "email": "laxmiautoserviceshpcl@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S DAMODAR SHIVRAM & CO,KOLHAPUR C",
                    "sapCode": "41050764",
                    "location": "HP PETROL PUMP, City Survey No- 399, Basant Bahar Rd, Assembly Rd, Shahupuri, Kolhapur, Taluka-Karveer, District- Kolhapur, M.S. – 416001.",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Sandeep gadre and Ashish shah",
                        "mobile": "9822066665, 9860606565",
                        "email": "dsretailoutlet@gmail.com"
                    },
                    "roManager": {
                        "name": "Arun Sawant",
                        "email": "dsretailoutlet@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S DEOKAR AUTOMOBILES,KOLHAPUR",
                    "sapCode": "41049660",
                    "location": "HP Petrol Pump, Devkar Pananda, Near Rankala, A/P. - Kolhapur, Dist.- Kolhapur, M.S. - 416002",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Mr.Shivaji Shamrao Deokar",
                        "mobile": "8975976676",
                        "email": "varshashipugade1@gmail.com"
                    },
                    "roManager": {
                        "name": "Shivaji",
                        "email": "varshashipugade1@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 9,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S DEEPRAJ PETROLEUM,PANHALA",
                    "sapCode": "41043871",
                    "location": "HP Petrol Pump, Gat No. 64, Kolhapur-Ratnagiri Road, NH-204, A/P. - Danewadi, Taluka - Panhala, Dist..- Kolhapur, M.S. - 416205",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Ms.Anita P. Nalage",
                        "mobile": "+91 78758 31657",
                        "email": "anitanalage247@gmail.com"
                    },
                    "roManager": {
                        "name": "Ms.Anita P. Nalage",
                        "email": "patilravi7917@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S LAXMI PETROLEUM,YELLUR",
                    "sapCode": "41044216",
                    "location": "HP PETROL PUMP, A/P.- YELLUR, GAT NO.903, RATNAGIRI KOLHAPUR ROAD, NH-204, TAH.- SHAHUWADI, DIST. - KOLHAPUR, M.S. - 415101",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Mr. Nanadkumar Ingavale",
                        "mobile": "9822719007",
                        "email": "laxmipetroleumhpcl@gmail.com"
                    },
                    "roManager": {
                        "name": "Ganesh varne",
                        "email": "varnekedar@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S JYOTI PETROLEUM,PHULEWADI",
                    "sapCode": "41044454",
                    "location": "HP PETROL PUMP, Survey No. 255/1b, Plot No 1, A/P.- Balinga, Taluka – Karveer,Phulewadi Kalamba Ring Road, Dist.- Kolhapur, M.S.- 416010",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Sandeep krishnarao Ingawale",
                        "mobile": "9975115936",
                        "email": "sandipingawale007@gmail.com"
                    },
                    "roManager": {
                        "name": "Sandeep krishnarao Ingawale",
                        "email": "sandipingawale007@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S. J B PETROLINKS, SHAHAPUR",
                    "sapCode": "41044747",
                    "location": "HP Petrol Pump, Gat No. 456, Village - Shahapur, Taluka - Hatkanangle, Ichalkaranji - Shahapur Road, Dist.- Kolhapur, M.S. - 416115",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Mrs. MADHURI JADHAV & TANUJA JADHAV",
                        "mobile": "9372144177",
                        "email": "jbpetrolinks@gmail.com"
                    },
                    "roManager": {
                        "name": "KALLAPPA VATHARE",
                        "email": "jbpetrolinks @gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S YASHOMALA ENERGY SUPPLIERS",
                    "sapCode": "41042468",
                    "location": "HP Petrol Pump, Gat No. 281 A, Village - Shiye, Taluka - Karveer, Near NXG Car Care, Shiye- Kasba Bawada Rd, Dist.- Kolhapur, M.S. – 416122",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Suraj Bhosale",
                        "mobile": "9960018787",
                        "email": "yashomala.energy@gmail.com"
                    },
                    "roManager": {
                        "name": "Vishal Sid",
                        "email": "yashomala.energy@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S HP HIGHWAY SERVICES, WATHAR,WAT",
                    "sapCode": "41044524",
                    "location": "HP Petrol Pump, A/P. - Wadgaon, NH4, Pune Bangalore Road, Taluka - Hathkanangale, Dist. - Kolhapur, M.S.- -416012",
                    "district": "Kolhapur",
                    "dealer": {
                        "name": "Indrajeet konduskar",
                        "mobile": "9321939009",
                        "email": "khambevijay@gmail.com"
                    },
                    "roManager": {
                        "name": "Vijay Khambe",
                        "email": "khambevijay@gmail.com"
                    },
                    "saName": "Kolhapur",
                    "salesOfficer": {
                        "name": "Samar Rizwi",
                        "mobile": "9205078807",
                        "email": "mdsamar.rizwi@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SAMARTH TRADERS,DHAMINI",
                    "sapCode": "41051493",
                    "location": "HP PETROL PUMP, NH66, Post - Dhamini,Taluka - Sangameshwar, Dist. - Ratnagiri, M.S. - 415611",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Uday Lodh",
                        "mobile": "9822335588 / 9890108080",
                        "email": "udaylodh@yahoo.com samarthtraders@gmail.coms"
                    },
                    "roManager": {
                        "name": "Sagar Shetye",
                        "email": "saipooja768@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S DAMODAR SHIVRAM & CO, HATHKHAMB",
                    "sapCode": "41050475",
                    "location": "HP Petrol Pump, Goa-Mumbai Highway NH-17, A/P. - Hathkhamba, Dist. -Ratnagiri, M.S. -415619",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Deepak P. Gadre",
                        "mobile": "9823120132",
                        "email": "deepak.gadre@gadremarine.com"
                    },
                    "roManager": {
                        "name": "Vilas A Kale",
                        "email": "vilas.kale@damodarshivram.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 32,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 40,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S V P SHETYE,LANJA",
                    "sapCode": "41050569",
                    "location": "HP Petrol Pump, Survey No. 216/A/1A, Mumbai - Goa Highway, NH17, A/P. - Lanja, Taluka - Lanja, Dist. - Ratnagiri, M.S. -416701",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Kuldeep Parshuram Shetye",
                        "mobile": "9021544618",
                        "email": "kuldeepshetye81@gmail. Com"
                    },
                    "roManager": {
                        "name": "Swapnil Arvind Chavan",
                        "email": "chavanswapnil446@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S NAIK PETROLEUM,KANKAVALI",
                    "sapCode": "41050394",
                    "location": "HP Petrol Pump, Survey No. - 19, Goa-Mumbai Highway, NH66, Near Ghopri Ashram, Waghda, A/P.- Kankavali, Dist. - Sindhudurg, M.S. - 416602",
                    "district": "Sindhudurg",
                    "dealer": {
                        "name": "Smt. Sushama Vijay Naik",
                        "mobile": "9421952113",
                        "email": "naikpetroleum2014@gmail.com"
                    },
                    "roManager": {
                        "name": "Ravi Parab",
                        "email": "parabrp1975@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S M B AGENCIES,AMBOLI",
                    "sapCode": "41043904",
                    "location": "HP Petrol Pump, A/P. - Amboli, On SH 121 (Chandgad-Sawantwadi). S. No 32A, Taluka - Sawantwadi, District - Sindhudurg, M.S. - 416532",
                    "district": "Sindhudurg",
                    "dealer": {
                        "name": "Rashmi Rasal",
                        "mobile": "8668627110",
                        "email": "rashmirasal7@gmail.com"
                    },
                    "roManager": {
                        "name": "Sanjay Gawade",
                        "email": "gawadesanjay 1047@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S KRUPA FUEL CENTER,VENGURLA",
                    "sapCode": "41044185",
                    "location": "HP PETROL PUMP, SAI NAGAR, BHATWADI, VENGURLA, TAHSIL - VENGURLA, DIST. - SINDHUDURG, M.S. - 416516",
                    "district": "Sindhudurg",
                    "dealer": {
                        "name": "Vijay Varaskar",
                        "mobile": "9860699416",
                        "email": "hpkrupafuel@gmail.com"
                    },
                    "roManager": {
                        "name": "Sachin Aeer",
                        "email": "hpkrupafuel@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S NOBLE AUTO,MANDANGAD",
                    "sapCode": "41044223",
                    "location": "HP Petrol Pump, S.No.38, Hissa No. 3B2/1, A/P.- Mandangad, Mandangad -Bankot Road, Opposite HP Gas, Tah.- Mandangad, Ratnagiri, M.S. -415203",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Shaibaz Jabbar Mukadam",
                        "mobile": "9768465949",
                        "email": "nobleauto949@gmail.com"
                    },
                    "roManager": {
                        "name": "Athar Hassanmiya Dimtimkar",
                        "email": "dimtimkara@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S VAISHNAVI AUTOMOBILES,KAPSAL",
                    "sapCode": "41044228",
                    "location": "HP Petrol Pump, S.No.23, At - Kapsal, Opp. Government Rest House, Tahsil - Chiplun, Dist. - Ratnagiri, M.S. - 415605",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Anil rajaram redij",
                        "mobile": "9420487778",
                        "email": "Vaishnavi_automobiles@yahoo.in"
                    },
                    "roManager": {
                        "name": "Rupesh Mhasavkar",
                        "email": "Raj.telelinks @yahoo.co.in"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SAHIL - SHANTI PETROLEUM,HATHKH",
                    "sapCode": "41044448",
                    "location": "HP Petrol Pump, Gat No. 5/6 & 7, A/P.- Hathkhamba (Tarvewadi), NH-66, Mumbai-Goa Highway, Tehsil - Ratnagiri, Dist.- Ratnagiri, M.S.- 415619",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Snehal shekhar mhap",
                        "mobile": "8806202202",
                        "email": "sahilshanti99@gmail.com"
                    },
                    "roManager": {
                        "name": "Nitin pale",
                        "email": "nitin.pale@yahoo.in"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S ZARAP PETROLEUM,ZARAP",
                    "sapCode": "41044458",
                    "location": "HP Petrol Pump, Gat No. 957, 959/2/1, 995/64, 995/64 & 959/3B, A/P.- Zarap, Tehsil - Kudal, Dist.- Sindhudurg, M.S. - 416520",
                    "district": "Sindhudurg",
                    "dealer": {
                        "name": "Vilas Ramchandra Kubal",
                        "mobile": "7738753555",
                        "email": "hp.zarap@gmail.com"
                    },
                    "roManager": {
                        "name": "Gitesh Hodavdekar",
                        "email": "hp.zarap@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SUVARNAREKHA PETROLINES,JAYGAD",
                    "sapCode": "41044484",
                    "location": "HP Petrol Pump, Survey No. 69, H. No.21, SH-164, A/P.- Chaferi, Khandala Jaygad Rd., Dist.- Ratnagiri, M.S. - 415614",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Mr.Govind Dinesh Gajra",
                        "mobile": "7219500154",
                        "email": "suvarnarekhapetrolines07@gmail.com"
                    },
                    "roManager": {
                        "name": "Mr. Nitesh Dattaram Payare",
                        "email": "niteshpayare11@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "Vasco RO",
                    "name": "SHRI MAHAPURUSH PETROLEUM",
                    "sapCode": "41044732",
                    "location": "HP Petrol Pump, Gat No 195/5 & 195/2, Village - Kondgaon, Murlidhar Ali, Taluka - Deorukh Sangameshwar, Dist. - Ratnagiri, M.S. - 415801",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Seeya Sameer Shirgaonkar",
                        "mobile": "8237418522",
                        "email": "mahapurushpetroleum@gmail.com"
                    },
                    "roManager": {
                        "name": "Jay Kasekar",
                        "email": "mahapurushpetroleum@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "GAVANKAR FUEL STATION, WALOPE",
                    "sapCode": "41044726",
                    "location": "HP PETROL PUMP, PLOT NO. 418/2, A/P.- WALOPE, NH-66, TALUKA - CHIPLUN, DIST.- RATNAGIRI, M.S. - 415605",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Dattatray Gavankar",
                        "mobile": "9867259999",
                        "email": "ninadgavankar.office@gmail.com"
                    },
                    "roManager": {
                        "name": "Ninad Gavankar",
                        "email": "ninadgavankar.office@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SUNITA & SONS",
                    "sapCode": "41044728",
                    "location": "HP Petrol Pump, Gat No. 146 & 147, At - Puragaon, Post - Kuve, Taluka - Lanja, Dist.- Ratnagiri, M.S. – 416701",
                    "district": "Ratnagiri",
                    "dealer": {
                        "name": "Nitin Ramchandra Jogale",
                        "mobile": "9870228430",
                        "email": "sunitasons54@gmail.com"
                    },
                    "roManager": {
                        "name": "Santosh Dongarkar",
                        "email": "santoshhpcl1991@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHREE KRUPA PETROLEUM",
                    "sapCode": "41042485",
                    "location": "HP Petrol Pump, Survey no 142/4, Village Jambhulgaon, Taluka kankavali, Dist.- Sindhudurg, M.S. - 416801",
                    "district": "Sindhudurg",
                    "dealer": {
                        "name": "Sandip teli",
                        "mobile": "8080426766",
                        "email": "sandipteli291@gmail.com"
                    },
                    "roManager": {
                        "name": "Suraj Mungekar",
                        "email": "surajmungekar1510@gmail.com"
                    },
                    "saName": "Ratnagiri",
                    "salesOfficer": {
                        "name": "Abhishek Emil Topno",
                        "mobile": "8249536983",
                        "email": "abhishekemil.topno@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S VILAS PATIL & BROS,ISLAMPUR",
                    "sapCode": "41050490",
                    "location": "HP PETROL PUMP, CTS NO- 749/A, A/P. - ISLAMPUR, TALUKA - WALWA, SANGLI - PETHNAKA ROAD, NH 166H, DIST. SANGLI, M.S. - 416409",
                    "district": "Sangli",
                    "dealer": {
                        "name": "sampatrao patil and balasaheb patil",
                        "mobile": "9168105242",
                        "email": "Vilasraopatilandbrothrers@gmail.com"
                    },
                    "roManager": {
                        "name": "Manik pawar",
                        "email": "imrmanik@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S AISHWARYA AUTOMOBILES,ASHTA",
                    "sapCode": "41050063",
                    "location": "HP PETROL PUMP, 3391/B, S/P. - ASHTA, SANGLI -ISLAMPUR ROAD, TALUKA - WALWA, DIST. - SANGLI, M.S. - 416301",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Anita Dilip Vagyani",
                        "mobile": "9890659192",
                        "email": "aishauto2003@gmail.com"
                    },
                    "roManager": {
                        "name": "Murlidhar Shankar Ghodake",
                        "email": "ghodakemurlidhar856@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S MANISH AGRO SERVICE CENTRE,KASE",
                    "sapCode": "41050287",
                    "location": "HP PETROL PUMP, A/P.- KASEGAON, TEHSIL - WALWA, DIST.- SANGLI, M.S. - 415404",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Rajiv Ashok Barde",
                        "mobile": "9158571616",
                        "email": "manishagrosc@gmail.com"
                    },
                    "roManager": {
                        "name": "Uttam Pandurang Patil",
                        "email": "manishagrosc@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S CHETNA PETROLEUM,VISHRAMBAUG",
                    "sapCode": "41050295",
                    "location": "HP Petrol Pump, Gat No- 332/2, Vishrambaug, Samarth Chowk, 100 Feet Road, Sangli, Taluka - Miraj, Dist.- Sangli, M.S.- 416416",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Neeta Kelkar",
                        "mobile": "9158311152",
                        "email": "chetanapet@gmail.com"
                    },
                    "roManager": {
                        "name": "Abhijeet Sonavane",
                        "email": "chetanapet@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S VENKATESHWARA PETROLEUM,SHIRDHO",
                    "sapCode": "41044165",
                    "location": "HP Petrol Pump, Miraj Pandharpur Road, SH-3, A/P. - Shirdhon, Dist.- Sangli, M.S. - 416419",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Uday Laxman jadhav",
                        "mobile": "7350266266",
                        "email": "uday24.win@rediffmail.com"
                    },
                    "roManager": {
                        "name": "Vaibhav Chougule",
                        "email": "vai24.win@rediffmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHREE MALKARSIDH PETROLEUM,UMDI",
                    "sapCode": "41044180",
                    "location": "HP Petrol Pump, S. No. 259 & 260/3, A/P.- Umdi, SH-141,Taluka - Jath, Dist.- Sangli, M.S. - 416413.",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Vilas Ramchandra Gidde",
                        "mobile": "9423809914",
                        "email": "Vilasgidde5005@gmail.com"
                    },
                    "roManager": {
                        "name": "Mahesh Rajmane",
                        "email": "shreemalkarsidhapetroleum@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S AJANTHA FUELS,TASGOAN",
                    "sapCode": "41044217",
                    "location": "HP PETROL PUMP, GAT NO.75/2, PLOT NO.C1, NEAR HOTEL ISHA, TASGAON SANGLI ROAD, A/P. - TASGAON, DIST.- SANGLI, M.S.- 416312",
                    "district": "Sangli",
                    "dealer": {
                        "name": "AMIT KOTECHA",
                        "mobile": "9372104148",
                        "email": "ajanthafuels@gmail.com"
                    },
                    "roManager": {
                        "name": "UDAY GADHAVE",
                        "email": "ajanthafuels@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S PARTH PETROLEUM,LENGRE",
                    "sapCode": "41044452",
                    "location": "HP PETROL PUMP, S./GAT NO. 733, A/P.- LENGRE,VITA TO LENGRE ROAD, TEHSIL - KHANAPUR, DIST. - SANGLI, M.S. - 415309",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Prashant shivaji sawant",
                        "mobile": "9420793854",
                        "email": "Parthpetroleum88@gmail.com"
                    },
                    "roManager": {
                        "name": "Parth Prashant sawant",
                        "email": "Parthpetroleum88@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S AISHWARYA PETROLEUM,KASABE DIGR",
                    "sapCode": "41044472",
                    "location": "HP PETROL PUMP, SURVEY NO. 761/3/A, KASABE DIGRAJ, SANGLI - ISLAMPUR ROAD, TEHSIL - MIRAJ, SH-138,SANGLI, M.S. - 416305",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Koushik Vagyani",
                        "mobile": "9850185999",
                        "email": "Koushikvagyani@gmail.com"
                    },
                    "roManager": {
                        "name": "Raju Bhokre",
                        "email": "Kvagyani@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S PORWAL PETROLEUM,VITTHALWADI",
                    "sapCode": "41044509",
                    "location": "HP PETROL PUMP, VILLAGE - VITTHALWADI, POST - KAMERI, SURVEY NO. 123/2B, NH-4, TEHSIL - WALWA, DIST.- SANGLI, M.S. - 415403",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Rahul Porwal",
                        "mobile": "9975956777",
                        "email": "rahul.porwal1@gmail.com"
                    },
                    "roManager": {
                        "name": "Anil Barapate",
                        "email": "anil.barapate1@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S. VANJALE PETROLEUM",
                    "sapCode": "41044745",
                    "location": "HP Petrol Pump, S. No. 13/1/2/A/B, A/P. - Miraj, Miraj - Pandharpur Road, Opp. Government Medical College Office, Taluka - Miraj, Dist. - Sangli, M.S. - 416410",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Santosh b vanjale.",
                        "mobile": "9403119999",
                        "email": "Vanjalepetroleum@gmail.com"
                    },
                    "roManager": {
                        "name": "Sanskr Gore",
                        "email": "Vanjalepetroleum@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S. SHANKAR PETROLEUM",
                    "sapCode": "41042472",
                    "location": "HP Petrol Pump, Gat No.120, Village - Vasumbhe, Taluka - Tasgaon, NH266 Karad - Tasgaon - Manerajuri Road, Dist.- Sangli, M.S. – 416312",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Pranita Vivek Kumbhar",
                        "mobile": "9763563795",
                        "email": "shankarpetroleum4782@gmail.com"
                    },
                    "roManager": {
                        "name": "Dattatray Baban Edake",
                        "email": "shankarpetroleum4782@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S RAJSHREE FILLING STATION",
                    "sapCode": "41042484",
                    "location": "HP PETROL PUMP, GAT NO 251/252, VILLAGE- KUNDAL, TALUKA - PALUS, KARAD JATH ROAD NH 266, DIST. - SANGLI, M.S. - 416309",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Dhavalsinh Shankar Pawar",
                        "mobile": "9503682795",
                        "email": "pawardhavalsinh@gmail.com"
                    },
                    "roManager": {
                        "name": "Ratansinh pawar",
                        "email": "ratanpawar53@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 9,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHREE RAM SERVICE CENTRE,JATH",
                    "sapCode": "41052934",
                    "location": "HP PETROL PUMP, A/P. - JATH, VIJAPUR ROAD, MARKET YARD, TALUKA - JATH, DIST.- SANGLI, M.S. - 416404",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Shakuntala Bamane",
                        "mobile": "9765575009",
                        "email": "sriramjath@gmail.com"
                    },
                    "roManager": {
                        "name": "Amar koli",
                        "email": "amarkoli1840@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                },
                {
                    "region": "Vasco RO",
                    "name": "M/S SHRI DHANESHWARI AUTO CENTRE,SA",
                    "sapCode": "41049495",
                    "location": "HP PETROL PUMP, S.NO.1/1, HIGH SCHOOL ROAD, VILLAGE - SANKH, TALUKA - JATH, DIST. - SANGLI, MS..- 416412",
                    "district": "Sangli",
                    "dealer": {
                        "name": "Parameshwari s vhanmrathe",
                        "mobile": "9403402620",
                        "email": "dhaneshwariauto@gmail.com"
                    },
                    "roManager": {
                        "name": "Sunil P Vhannamarathe",
                        "email": "svhannamarathe1@gmail.com"
                    },
                    "saName": "Sangli",
                    "salesOfficer": {
                        "name": "Anugya Vats",
                        "mobile": "7768890678",
                        "email": "anugya.vats@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": []
                }
            ]
        }

        // ✅ Transform to match Outlet schema
        const outlets = rawData.outlets.map((o) => ({
            name: o.name.trim(),
            code: o.sapCode,
            zone: o.region === "Vasco RO" ? VASCO_ZONE_ID : null,
            address: o.location,
            footfallType: "urban",
            meta: {
                region: o.region,
                district: o.district,
                dealer: {
                    name: o.dealer?.name || "",
                    contact: o.dealer?.mobile || "",
                    email: o.dealer?.email || "",
                },
                roManager: {
                    name: o.roManager?.name || "",
                    email: o.roManager?.email || "",
                },
                sa: o.saName,
                so: {
                    name: o.salesOfficer?.name || "",
                    phone: o.salesOfficer?.mobile || "",
                    email: o.salesOfficer?.email || "",
                },
                facilities: {
                    noOfCSA: o.noOfCSAs,
                    hasSittingSpace: o.sittingSpaceAvailable,
                    hasIslandSpace: o.islandSpaceAvailable,
                    standingCapacity: o.standingCapacity,
                },
                nearbyOutlets: o.nearbyOutlets || [],
            },
        }));

        await Outlet.deleteMany({});
        console.log("🧹 Existing outlets cleared.");

        const created = await Outlet.insertMany(outlets);
        console.log(`✅ ${created.length} outlets added successfully!`);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding outlets:", err.message);
        process.exit(1);
    }
};

seedOutlets();
