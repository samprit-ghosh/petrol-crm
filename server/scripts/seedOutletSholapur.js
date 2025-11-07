import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

const seedOutlets = async () => {
    try {
        const SHOLAPUR_ZONE_ID = new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e9");

        const rawData = {
            outlets: [
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41053269",
                    "name": "SRI RAM HIGHWAY CENTRE",
                    "location": "KURDUWADI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI. VIKAS KALE",
                        "mobile": "9850819696",
                        "email": "vikaskale65@gmail.com"
                    },
                    "roManager": {
                        "name": "SHRI. VISHAL BHAGAT",
                        "mobile": "8483998980",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 7,
                    "nearbyOutlets": ["SAKSHI PETROLEUM", "SHREE SAI VITTHAL PETROLEUM"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41045279",
                    "name": "SAKSHI PETROLEUM",
                    "location": "RIDHORE",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI. RAJKUMAR DESHMUKH",
                        "mobile": "9822521151",
                        "email": "rajkumardeshmukh5051@gmail.com"
                    },
                    "roManager": {
                        "name": "SHRI. SACHIN BARDE",
                        "mobile": "9960122109",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 4,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41055754",
                    "name": "SHREE SAI VITTHAL PETROLEUM",
                    "location": "ROPALE",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI. PRATIK RAWADE",
                        "mobile": "9987380446",
                        "email": "pratik.rawade123@gmail.com"
                    },
                    "roManager": {
                        "name": "SHRI VIJAY NALAVADE",
                        "mobile": "7559313166",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 4,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41052026",
                    "name": "OM SAI RAJ PETROLEUM",
                    "location": "TEMBHURNI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SMT. JAYSHREE YEVALE-PATIL",
                        "mobile": "9665993661",
                        "email": "omsairajpetroleum2255@gmail.com"
                    },
                    "roManager": {
                        "name": "SHRI. PRAVIN KALE",
                        "mobile": "9623558955",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["PANDURANG PETROLEUM SERVICES", "PANDURANG PETROLEUM", "GAJALAXMI PETROLEUM"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41048362",
                    "name": "PANDURANG PETROLEUM SERVICES",
                    "location": "KANDAR",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI DADASAHEB PATIL",
                        "mobile": "9766568555",
                        "email": "dadasahebpatil25@yahoo.in"
                    },
                    "roManager": {
                        "name": "SHRI. SACHIN PADASE",
                        "mobile": "9960858071",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 4,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41050437",
                    "name": "PANDURANG PETROLEUM",
                    "location": "KARKAMB",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI SATISH AARADHYA",
                        "mobile": "9021221716",
                        "email": "vjoshi353@gmail.com"
                    },
                    "roManager": {
                        "name": "SHRI. SDHIR JOSHI",
                        "mobile": "9850364001",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 4,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41054123",
                    "name": "GAJALAXMI PETROLEUM",
                    "location": "SAPATNE",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI. SURESH NEHATRAO",
                        "mobile": "9130030889",
                        "email": "gajalaxmi.petroleum@outlook.com"
                    },
                    "roManager": {
                        "name": "SHRI. SIDDHESHWAR DEOKAR",
                        "mobile": "9730497083",
                        "email": ""
                    },
                    "saName": "PANDHARPUR",
                    "salesOfficer": {
                        "name": "AKSHAY TEMBHURNE",
                        "mobile": "8652308666",
                        "email": "akshayt@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 4,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41041494",
                    "name": "SRPF GR X PETROL PUMP",
                    "location": "SOREGAON",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "THE COMMANDANT SRPF CAMP GROUP 10",
                        "mobile": "8767063967",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Madhav Bhosale",
                        "mobile": "9890242483",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092963",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["Bhogade", "Shri gurukrupa petroleum"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41040902",
                    "name": "BHOGADE PETROLEUM, SOLAPUR",
                    "location": "SOLAPUR",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SMT. SHRIDEVI SUDHAKAR KAMSHETTI & NAGESH SANDESH BHOGADE",
                        "mobile": "9561110905",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Suresh Kumar",
                        "mobile": "9922559905",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092964",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 8,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41043260",
                    "name": "SHRI GURUKRUPA PETROLEUM",
                    "location": "SOLAPUR",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "Shri .MALLIKARJUN SIDDHARAM PATIL",
                        "mobile": "9850290377",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Shahir Gandure",
                        "mobile": "9730303095",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092965",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 10,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41056079",
                    "name": "KRANTI PETROLEUM, SAUNDRE",
                    "location": "SAUNDRE",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "PANKAJ HARIBHAU KOLEKAR & CHETAN HARIBHAU KOLEKAR",
                        "mobile": "9881111754",
                        "email": ""
                    },
                    "roManager": {
                        "name": "",
                        "mobile": "9881111754",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092966",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 7,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 8,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41039407",
                    "name": "SOJAR PETROLEUM, KHANDAVI",
                    "location": "KHANDAVI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "ARUN ARJUNRAO BARBOLE",
                        "mobile": "9370099999",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Lahoti",
                        "mobile": "7972129292",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092967",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 6,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["Kranti petroleum", "Jaylakshmi Petroleum"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41050405",
                    "name": "JAYLAKSHMI PETROLEUM, GULWANCHI",
                    "location": "GULWANCHI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SMT. ALKA PRAKASH MASKE",
                        "mobile": "9011414130",
                        "email": ""
                    },
                    "roManager": {
                        "name": "SMT. ALKA PRAKASH MASKE",
                        "mobile": "9011414130",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092968",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 8,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41046264",
                    "name": "ABHINAV PETROLEUM, DHANGARWADI",
                    "location": "DHANGARWADI",
                    "district": "DHARASHIV",
                    "dealer": {
                        "name": "SMT. POONAM SUNIL DABHADE &SHRI VIJAYKUMAR HANMANT GAVHANE",
                        "mobile": "8600962319",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Ajit ghavane",
                        "mobile": "8600962319",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092969",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 10,
                    "nearbyOutlets": []
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41055811",
                    "name": "SAGAR PETROLEUM",
                    "location": "BELATI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SUBASH PRALHAD DONGARE",
                        "mobile": "9881033777",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Shri Rahul mahajan",
                        "mobile": "9172131122",
                        "email": ""
                    },
                    "saName": "SHOLAPUR",
                    "salesOfficer": {
                        "name": "LIKHITHKUMARREDDY YENDODU",
                        "mobile": "9702092970",
                        "email": "likhithkumarreddy.yendodu@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["Abhinav Petroleum"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41052177",
                    "name": "MSHSD BALDAWA HIGHWAY SERVICE",
                    "location": "KATICHINCHOLI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SHRI NANDKISHOR R. BALDAWA, AND SMT. ALKA S. BALDAWA",
                        "mobile": "+91 86051 97711",
                        "email": "baldawahighway@rediffmail.com"
                    },
                    "roManager": {
                        "name": "Shrikant",
                        "mobile": "8830175527",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["SAHYADRI HIGHWAY SERVICES", "SURESH PETROLEUM"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41041973",
                    "name": "MSHSD SAHYADRI HIGHWAY SERVICES",
                    "location": "KATICHINCHOLI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SMT. ASHWINI ROHIT JADHAV",
                        "mobile": "7972398122",
                        "email": ""
                    },
                    "roManager": {
                        "name": "Bapu Bhosale",
                        "mobile": "9850242917",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 4,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41050573",
                    "name": "SURESH PETROLEUM",
                    "location": "DODDI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SUSHIL SURESH GAIDHANKAR",
                        "mobile": "9011414130",
                        "email": ""
                    },
                    "roManager": {
                        "name": "",
                        "mobile": "",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41039374",
                    "name": "MSHSD CHOUDHARI PETROLEUM",
                    "location": "GHODESHWAR",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "ASLAM CHOUDARY",
                        "mobile": "9421031078",
                        "email": ""
                    },
                    "roManager": {
                        "name": "AHETHESHAM",
                        "mobile": "+91 98602 77151",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 8,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["PATIL HIGHWAY", "AWATADE PETROLEUM"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41051952",
                    "name": "MSHSD PATIL HIGHWAY SERVICES",
                    "location": "KAMTI",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SEEMA BHARAT PATIL",
                        "mobile": "9822801990",
                        "email": ""
                    },
                    "roManager": {
                        "name": "SOMNATH",
                        "mobile": "+91 99232 34357",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 6,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["NA"]
                },
                {
                    "region": "SHOLAPUR",
                    "sapCode": "41034713",
                    "name": "MSHSD AWTADE PETROLEUM",
                    "location": "MANGALWEDHA",
                    "district": "SOLAPUR",
                    "dealer": {
                        "name": "SOMNATH VISHNUPANT AWATADE",
                        "mobile": "9422436007",
                        "email": ""
                    },
                    "roManager": {
                        "name": "SWAPNIL",
                        "mobile": "+91 97301 18578",
                        "email": ""
                    },
                    "saName": "SOLAPUR-2",
                    "salesOfficer": {
                        "name": "AKASH NAIK",
                        "mobile": "8951924511",
                        "email": "akashsuresh.naik@hpcl.in"
                    },
                    "noOfCSAs": 6,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 6,
                    "nearbyOutlets": ["NA"]
                }
            ]
        };

        // ✅ Transform to match Outlet schema
        const outlets = rawData.outlets.map((o) => ({
            name: o.name.trim(),
            code: o.sapCode,
            zone: o.region === "SHOLAPUR" ? SHOLAPUR_ZONE_ID : null,
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

        // await Outlet.deleteMany({});
        // console.log("🧹 Existing outlets cleared.");

        const created = await Outlet.insertMany(outlets);
        console.log(`✅ ${created.length} outlets added successfully!`);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding outlets:", err.message);
        process.exit(1);
    }
};

seedOutlets();
