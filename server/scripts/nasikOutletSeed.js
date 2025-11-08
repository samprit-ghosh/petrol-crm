import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

// Helper function: generate 5-digit random code
const generateSapCode = () => String(Math.floor(10000 + Math.random() * 90000));

const seedOutlets = async () => {
    try {
        const NASIK_ZONE_ID = new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8");

        const rawData = {
            outlets: [
                {
                    "region": "Nasik",
                    "sapCode": "41047951",
                    "name": "Ekvira Petroleum",
                    "location": "Nandur Shinghote",
                    "district": "Nashik",
                    "dealer": {
                        "name": "SMT. SUNITA RAJU SHELKE",
                        "mobile": "9822683648",
                        "email": "41047951@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SWAPNIL SANAP",
                        "mobile": "9822683648",
                        "email": "ekvirapetrolium13@rediffmail.com"
                    },
                    "saName": "NASIK-1",
                    "salesOfficer": {
                        "name": "ROHIT NIHORE",
                        "mobile": "8469309427",
                        "email": "rohitnihore@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["Hare Krishna", "Shankar Balaji WAJe", "OM SAI BABA"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41048441",
                    "name": "MSHSD DESHMANE PETROLEUM",
                    "location": "NH-52 pimpalgaon",
                    "district": "Nashik",
                    "dealer": {
                        "name": "SATISH RAMARAO DESHMANE",
                        "mobile": "9890446370",
                        "email": "41048441@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SATISH DESHMANE",
                        "mobile": "9890446370",
                        "email": "deshmanepetroleum@gmail.com"
                    },
                    "saName": "NASIK-1",
                    "salesOfficer": {
                        "name": "ROHIT NIHORE",
                        "mobile": "8469309427",
                        "email": "rohitnihore@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["THETE PATIL", "SAI SHRADHA"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41040578",
                    "name": "MSHSD OM SAI PETROLEUM",
                    "location": "ADGAON",
                    "district": "Nashik",
                    "dealer": {
                        "name": "SHRI BHASKAR BANDU PAWAR",
                        "mobile": "9403158060",
                        "email": "41040578@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "BHASKAR B PAWAR",
                        "mobile": "9403158060",
                        "email": "omsai9petroleum@gmail.com"
                    },
                    "saName": "NASIK-1",
                    "salesOfficer": {
                        "name": "ROHIT NIHORE",
                        "mobile": "8469309427",
                        "email": "rohitnihore@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["SHIVSAI", "NIVRUTI JADHAV"]
                },
                {
                    "region": "NASIK",
                    "sapCode": "41047760",
                    "name": "MSHSD SHREE DUTT PETROLEUM",
                    "location": "LAM ROAD",
                    "district": "Nashik",
                    "dealer": {
                        "name": "SMT. VIDYA BAPU WAVARE",
                        "mobile": "9822342008",
                        "email": "41047760@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "VIDYA WAWRE",
                        "mobile": "9822342008",
                        "email": "shreedattpetroleum@gmail.com"
                    },
                    "saName": "NASIK-1",
                    "salesOfficer": {
                        "name": "ROHIT NIHORE",
                        "mobile": "8469309427",
                        "email": "rohitnihore@hpcl.in"
                    },
                    "noOfCSAs": 20,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["SAKSHI", "MURLI PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41034394",
                    "name": "M/s SHREE BALAJI ENERGY PLAZA",
                    "location": "OZAR",
                    "district": "Nashik",
                    "dealer": {
                        "name": "PANDURANG RAMCHANDRA WAGH AND VISHAL ARUN SARODE",
                        "mobile": "8237772233",
                        "email": "41034394@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "PANDURANG RAMCHANDRA WAGH AND VISHAL ARUN SARODE",
                        "mobile": "8237772233",
                        "email": "41034394@retail.hpcl.co.in"
                    },
                    "saName": "NASIK-1",
                    "salesOfficer": {
                        "name": "ROHIT NIHORE",
                        "mobile": "8469309427",
                        "email": "rohitnihore@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["SHIVAM CITY"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41050103",
                    "name": "MS/HSD SUMAN PETROLEUM",
                    "location": "Nashik",
                    "district": "Nashik",
                    "dealer": {
                        "name": "AJIT PANDIT DHATRAK",
                        "mobile": "7774981653",
                        "email": "41050103@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "AJIT DHATRAK",
                        "mobile": "7774981653",
                        "email": "sumanpetrolium01@gmail.com"
                    },
                    "saName": "Nashik -2",
                    "salesOfficer": {
                        "name": "SONAWANE PRATHMESH SOMNATH",
                        "mobile": "9307957620",
                        "email": "prathmeshsomnath.sonawane@hpcl.in"
                    },
                    "noOfCSAs": 20,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["SUVIDYA PETROLEUM", "N& M PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41052407",
                    "name": "MS HSD KR BOOB",
                    "location": "Nashik",
                    "district": "Nashik",
                    "dealer": {
                        "name": "LALIT PRADEEP BOOB AND SAKSHI LALIT BOOB",
                        "mobile": "9922009908",
                        "email": "41052407@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "LALIT PRADEEP BOOB AND SAKSHI LALIT BOOB",
                        "mobile": "9922009908",
                        "email": "krboob@gmail.com"
                    },
                    "saName": "Nashik -2",
                    "salesOfficer": {
                        "name": "SONAWANE PRATHMESH SOMNATH",
                        "mobile": "9307957620",
                        "email": "prathmeshsomnath.sonawane@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["P E GOMASE", "VISHAL PETROLEUM", "SUYOG PETROLEUM", "KOUSALYA PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41047886",
                    "name": "MS/HSD-PANDAV PETROLEUM",
                    "location": "Nashik",
                    "district": "Nashik",
                    "dealer": {
                        "name": "ROSHAN DILIP JADHAV",
                        "mobile": "9890670551",
                        "email": "41047886@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "ROSHAN JADHAV",
                        "mobile": "9890670551",
                        "email": "pandavpetroleum@gmail.com"
                    },
                    "saName": "Nashik -2",
                    "salesOfficer": {
                        "name": "SONAWANE PRATHMESH SOMNATH",
                        "mobile": "9307957620",
                        "email": "prathmeshsomnath.sonawane@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["ADISHAKTI PETROLEUM", "ASMITATAI DIGHAVKAR PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41047737",
                    "name": "SANJIVANI AUTO FUEL",
                    "location": "Nashik",
                    "district": "Nashik",
                    "dealer": {
                        "name": "SAMEER  SONAWANE",
                        "mobile": "9890065333",
                        "email": "41047737@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SAMEER SONAWANE",
                        "mobile": "9890065333",
                        "email": "samirsonawane@yahoo.com"
                    },
                    "saName": "Nashik -2",
                    "salesOfficer": {
                        "name": "SONAWANE PRATHMESH SOMNATH",
                        "mobile": "9307957620",
                        "email": "prathmeshsomnath.sonawane@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["PARVATI FILLING STATION", "KOTHULE PETROLEUM", "PRATIK FUEL PLAZA"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41047877",
                    "name": "MSHSD BHOSALE PETROLEUM",
                    "location": "Malegaon- Ajang Road",
                    "district": "Nashik",
                    "dealer": {
                        "name": "BHUSHAN BHOSALE",
                        "mobile": "9422273666",
                        "email": "41047877@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "BUSHAN BHOSLE",
                        "mobile": "9422273666",
                        "email": "bhosale.petroleum@yahoo.com"
                    },
                    "saName": "Manmad",
                    "salesOfficer": {
                        "name": "SHOBIT SONI",
                        "mobile": "8193909938",
                        "email": "shobit.soni@hpcl.in"
                    },
                    "noOfCSAs": 25,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 35,
                    "nearbyOutlets": ["MSHSD RAMESH & BROTHERS", "M/s FIDVI AGENCIES", "RAGHAV PETROLEUM", "RADHIKA PETROLEUM", "NARMADA PETROLEUM", "TRYAMBAKRAJ PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41037875",
                    "name": "M/s ZARIWALA FUEL STATION",
                    "location": "Malegoan- Dhule Road",
                    "district": "Nashik",
                    "dealer": {
                        "name": "MAHFUZURRAHMAN MOHAMMED ISHAQUE",
                        "mobile": "9860205656",
                        "email": "41037875@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "MAHFUZURRAHMAN MOHAMMED ISHAQUE",
                        "mobile": "9860205656",
                        "email": "41037875@retail.hpcl.co.in"
                    },
                    "saName": "Manmad",
                    "salesOfficer": {
                        "name": "SHOBIT SONI",
                        "mobile": "8193909938",
                        "email": "shobit.soni@hpcl.in"
                    },
                    "noOfCSAs": 20,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["MSHSD MALPURE PETROLEUM", "MANJULE PETROLEUM", "JAY SHANKAR PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41052589",
                    "name": "MSHSD MANMAD AUTOMOBILES",
                    "location": "N/A",
                    "district": "Nashik",
                    "dealer": {
                        "name": "ALTAF MOHMAD DAWOOD, MOHMAD SALIM AHMAD, AMIN HAJI MOHMAD HARRON, MOHMAD AMIR HAJI YUNUS, AADIL HAJI ARIF",
                        "mobile": "9970710563",
                        "email": "41052589@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "ALTAF MOHMAD DAWOOD, MOHMAD SALIM AHMAD, AMIN HAJI MOHMAD HARRON, MOHMAD AMIR HAJI YUNUS, AADIL HAJI ARIF",
                        "mobile": "9970710563",
                        "email": "41052589@retail.hpcl.co.in"
                    },
                    "saName": "Manmad",
                    "salesOfficer": {
                        "name": "SHOBIT SONI",
                        "mobile": "8193909938",
                        "email": "shobit.soni@hpcl.in"
                    },
                    "noOfCSAs": 25,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 35,
                    "nearbyOutlets": ["MSHSD SHREE GURUKRUPA PETROLEUM", "BANKAR PATIL PETROLEUM", "YASH ENERGY"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41053714",
                    "name": "M/s S S P S SETHI BROTHERS",
                    "location": "DEOBHANE",
                    "district": "DHULE",
                    "dealer": {
                        "name": "SMT. CHARANJIT KAUR SHETHI, SHRI K.S. SETHI",
                        "mobile": "9960681888",
                        "email": "41053714@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SMT. CHARANJIT KAUR SHETHI, SHRI K.S. SETHI",
                        "mobile": "9960681888",
                        "email": "41053714@retail.hpcl.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/s SHREE RAMDEV PETROLEUM", "M/s. Shri Shri Balaji"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41024088",
                    "name": "M/s SUBHASH CHANDRA AND SONS,AVDHAN",
                    "location": "AWDHAN",
                    "district": "DHULE",
                    "dealer": {
                        "name": "SHRI SUSHIL LALCHAND POPLI",
                        "mobile": "9960004118",
                        "email": "41024088@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SUSHIL POPLI",
                        "mobile": "9960004118",
                        "email": "subhashchandra.281@rediffmail.com"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/s KRISHNA PETROLEUM", "SAKRI", "Koyal Automobiles"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41054462",
                    "name": "M/s VIGHNAHAR HIGHWAY SERVICE, BODK",
                    "location": "BODK",
                    "district": "DHULE",
                    "dealer": {
                        "name": "SMT. RAJNI VIRENDRA JAIN",
                        "mobile": "9665558888",
                        "email": "41054462@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "RAJANI JAIN",
                        "mobile": "9665558888",
                        "email": "virendrajain88@yahoo.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 11,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["No outlet is nearby"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41050904",
                    "name": "M/s SATPUDA PETROLEUM, SANGVI",
                    "location": "SANGVI",
                    "district": "DHULE",
                    "dealer": {
                        "name": "SHRI KRANTIKUMAR BUDHA PAWAR AND KULDIP ASHOK GAIKWAD",
                        "mobile": "9422286807",
                        "email": "41050904@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SHRI KRANTIKUMAR BUDHA PAWAR AND KULDIP ASHOK GAIKWAD",
                        "mobile": "9422286807",
                        "email": "41050904@retail.hpcl.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 11,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/s SHREE SAI PETROLEUM", "HADAKHED", "Vinayak Petroleum"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41044396",
                    "name": "M/s VAHEGURU PETROLEUM, SAVALDE",
                    "location": "SANGVI",
                    "district": "DHULE",
                    "dealer": {
                        "name": "MS. SANDHYA SALUJA",
                        "mobile": "9823193111",
                        "email": "41044396@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SANDHYA SALUJA",
                        "mobile": "9823193111",
                        "email": "41044396@retail.hpcl.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 9,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["M/s SHRI SHAM PETROLEUM", "KURKHALI"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41044392",
                    "name": "M/s BHOLENATH PETROLEUM, SHIRPUR KH",
                    "location": "SHIRPUR",
                    "district": "DHULE",
                    "dealer": {
                        "name": "MR. DINESH MADHUKAR PATIL",
                        "mobile": "9021154530",
                        "email": "41044392@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "DINESH PATIL",
                        "mobile": "9021154530",
                        "email": "41044392@retail.hpcl.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["GOVIND PETROLIUM", "GORANE"]
                },
                {
                    "region": "NASHIK",
                    "sapCode": "41045555",
                    "name": "JAGMA PETROLEUM",
                    "location": "KHED DIGAR",
                    "district": "NANDURBAR",
                    "dealer": {
                        "name": "MR. PRIYANK PATIL",
                        "mobile": "8007790077",
                        "email": "41045555@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "PRIYANK PATIL",
                        "mobile": "8007790077",
                        "email": "41045555@retail.hpcl.co.in"
                    },
                    "saName": "DHULE",
                    "salesOfficer": {
                        "name": "RANJAN",
                        "mobile": "7770822249",
                        "email": "ranjan1@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["No outlet is nearby"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41051686",
                    "name": "KABRA HIGHWAY PETROLEUM",
                    "location": "CHOPDA",
                    "district": "Jalgaon",
                    "dealer": {
                        "name": "SHRI NITIN SATYANARAYAN KABRE",
                        "mobile": "9822218851",
                        "email": "41051686@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "NITIN KABRE",
                        "mobile": "9822218851",
                        "email": "niteen_kabre@rediffmail.com"
                    },
                    "saName": "Jalgaon SA",
                    "salesOfficer": {
                        "name": "RAVI KUMAR BORI BORI",
                        "mobile": "9769991231",
                        "email": "ravikbori@hpcl.in"
                    },
                    "noOfCSAs": 11,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["PAWAR PETROLEUM", "MAHESH PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41053805",
                    "name": "DESHMUKH BROTHERS",
                    "location": "VARANGAON",
                    "district": "Jalgaon",
                    "dealer": {
                        "name": "SHRI SAMBHAJI N. DESHMUKH, SHRI UDAY N. DESHMUKH, SHRI SANJAY N. DESHMUKH",
                        "mobile": "9423187777/7249737777",
                        "email": "41053805@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "SHRI SAMBHAJI N. DESHMUKH, SHRI UDAY N. DESHMUKH, SHRI SANJAY N. DESHMUKH",
                        "mobile": "9423187777/7249737777",
                        "email": "mlsdeshmukhbros@gmail.com"
                    },
                    "saName": "Jalgaon SA",
                    "salesOfficer": {
                        "name": "RAVI KUMAR BORI BORI",
                        "mobile": "9769991231",
                        "email": "ravikbori@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["DENA SAI AUTO SERVICE", "CHANDRODAY PETROLEUM", "SSD PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41052070",
                    "name": "KALE PETROLEUM",
                    "location": "JALGAON",
                    "district": "Jalgaon",
                    "dealer": {
                        "name": "SHRI RAJENDRA PRALHAD KALE",
                        "mobile": "9423580873",
                        "email": "41052070@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "RAJENDRA KALE",
                        "mobile": "9423580873",
                        "email": "kaleraju333@gmail.com"
                    },
                    "saName": "Jalgaon SA",
                    "salesOfficer": {
                        "name": "RAVI KUMAR BORI BORI",
                        "mobile": "9769991231",
                        "email": "ravikbori@hpcl.in"
                    },
                    "noOfCSAs": 17,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["BHAGYASHRI PETROLEUM", "GURU PETROLEUM"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41041471",
                    "name": "PUSHPA PETROLEUM",
                    "location": "JALGAON",
                    "district": "Jalgaon",
                    "dealer": {
                        "name": "RAJESH OMPRAKASH AGRAWAL",
                        "mobile": "9823047269",
                        "email": "41041471@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "RAJESH AGRAWAL",
                        "mobile": "9823047269",
                        "email": "pushpapulses01@ymail.com"
                    },
                    "saName": "Jalgaon SA",
                    "salesOfficer": {
                        "name": "RAVI KUMAR BORI BORI",
                        "mobile": "9769991231",
                        "email": "ravikbori@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["SHRI GURU GANESH PETROLEUM", "JAIN BROTHERS"]
                },
                {
                    "region": "Nasik",
                    "sapCode": "41047750",
                    "name": "BABA PETROLEUM",
                    "location": "KHADKI",
                    "district": "Jalgaon",
                    "dealer": {
                        "name": "RAVINDRA PUNDALIK PATIL",
                        "mobile": "9028700800",
                        "email": "41047750@retail.hpcl.co.in"
                    },
                    "roManager": {
                        "name": "RAVINDRA PATIL",
                        "mobile": "9028700800",
                        "email": "tenujay24@yahoo.in"
                    },
                    "saName": "Jalgaon SA",
                    "salesOfficer": {
                        "name": "RAVI KUMAR BORI BORI",
                        "mobile": "9769991231",
                        "email": "ravikbori@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 11,
                    "nearbyOutlets": ["JOGESHWARI PETROLEUM"]
                }
            ]
        };

        // Add zone reference to each outlet
        const outletsWithZone = rawData.outlets.map(o => {
            return {
                name: o.name.trim(),
                code: o.sapCode && o.sapCode.trim() !== "" ? o.sapCode : generateSapCode(),
                zone: NASIK_ZONE_ID,
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
            };
        });

        // Clear existing outlets for this zone
        await Outlet.deleteMany({ zone: NASIK_ZONE_ID });
        console.log('Cleared existing outlets for Nasik zone');

        // Insert new outlets
        const result = await Outlet.insertMany(outletsWithZone);
        console.log(`Successfully seeded ${result.length} outlets for Nasik zone`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding outlets:', error);
        process.exit(1);
    }
};

seedOutlets();