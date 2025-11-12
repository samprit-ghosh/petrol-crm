import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

// Helper function: generate 5-digit random code
const generateSapCode = () => String(Math.floor(1000 + Math.random() * 9000));

const seedOutlets = async () => {
    try {
        const AURANGABAAD_ZONE_ID = new mongoose.Types.ObjectId("68fba5ead9e945db0dc2f7bf");

        const rawData = {
            outlets: [
                {
                    "region": "Aurangabad",
                    "sapCode": "414670932",
                    "name": "HP Service Centre Harsul",
                    "address": "Harsul, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Rahul Patil", "mobile": "9876543210", "email": "rahul.patil@hpcl.co.in" },
                    "roManager": { "name": "Vikas Deshmukh", "mobile": "9876501234", "email": "vikas.deshmukh@hpcl.co.in" },
                    "saName": "Aurangabad-1",
                    "salesOfficer": { "name": "Amit Bhosale", "mobile": "9823124578", "email": "amit.bhosale@hpcl.in" },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 18,
                    "nearbyOutlets": ["Shree Auto Care", "Om Petroleum"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "417851024",
                    "name": "Girija Samarth",
                    "address": "Sarnapur, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Sunil Jadhav", "mobile": "9876509876", "email": "sunil.jadhav@hpcl.co.in" },
                    "roManager": { "name": "Pooja Kale", "mobile": "9867098543", "email": "pooja.kale@hpcl.co.in" },
                    "saName": "Aurangabad-1",
                    "salesOfficer": { "name": "Ramesh Pawar", "mobile": "9812345678", "email": "ramesh.pawar@hpcl.in" },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["Sai Petroleum", "Jai Malhar"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "419384207",
                    "name": "HP Service Centre Supa",
                    "address": "Supa, Ahmednagar",
                    "district": "Ahmednagar",
                    "dealer": { "name": "Deepa Shinde", "mobile": "9898098754", "email": "deepa.shinde@hpcl.co.in" },
                    "roManager": { "name": "Akash Jagtap", "mobile": "9823765409", "email": "akash.jagtap@hpcl.co.in" },
                    "saName": "Ahmendnagar",
                    "salesOfficer": { "name": "Kiran Lokhande", "mobile": "9821765409", "email": "kiran.lokhande@hpcl.in" },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["Raj Petroleum", "Sai Auto Fuel"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "415009876",
                    "name": "Star Petroleum",
                    "address": "Jamkhed-Arangaon, Ahmednagar",
                    "district": "Ahmednagar",
                    "dealer": { "name": "Aarti Kulkarni", "mobile": "9823156790", "email": "aarti.kulkarni@hpcl.co.in" },
                    "roManager": { "name": "Nikhil Shinde", "mobile": "9874562130", "email": "nikhil.shinde@hpcl.co.in" },
                    "saName": "Ahmendnagar",
                    "salesOfficer": { "name": "Anita More", "mobile": "9823167485", "email": "anita.more@hpcl.in" },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 24,
                    "nearbyOutlets": ["Rajendra Fuel", "Ganesh Auto"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "412578934",
                    "name": "Supreme Petroleum",
                    "address": "Kasabkheda, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Sneha Deshpande", "mobile": "9832165487", "email": "sneha.deshpande@hpcl.co.in" },
                    "roManager": { "name": "Sachin Bhagat", "mobile": "9812376549", "email": "sachin.bhagat@hpcl.co.in" },
                    "saName": "Aurangabad-2",
                    "salesOfficer": { "name": "Kavita Gaikwad", "mobile": "9823476190", "email": "kavita.gaikwad@hpcl.in" },
                    "noOfCSAs": 11,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 19,
                    "nearbyOutlets": ["Sai Highway", "Shree Motors"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "416993485",
                    "name": "HP Auto Care Centre Waluj",
                    "address": "Waluj, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Vijay Patil", "mobile": "9823678941", "email": "vijay.patil@hpcl.co.in" },
                    "roManager": { "name": "Tejas Jadhav", "mobile": "9812789463", "email": "tejas.jadhav@hpcl.co.in" },
                    "saName": "Aurangabad-2",
                    "salesOfficer": { "name": "Rohit Borse", "mobile": "9876231450", "email": "rohit.borse@hpcl.in" },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["Om Petroleum", "Sai Service Station"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "414820557",
                    "name": "Satguru Highway",
                    "address": "Chikhli, Buldhana",
                    "district": "Buldhana",
                    "dealer": { "name": "Ashwini Pawar", "mobile": "9874501287", "email": "ashwini.pawar@hpcl.co.in" },
                    "roManager": { "name": "Anil Mane", "mobile": "9823478561", "email": "anil.mane@hpcl.co.in" },
                    "saName": "Jalna",
                    "salesOfficer": { "name": "Shruti More", "mobile": "9832761590", "email": "shruti.more@hpcl.in" },
                    "noOfCSAs": 10,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 18,
                    "nearbyOutlets": ["OM Sai Fuel", "Balaji Petroleum"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "415703924",
                    "name": "Kakde Petroleum",
                    "address": "Nagewadi, Jalna",
                    "district": "Jalna",
                    "dealer": { "name": "Kiran Kakde", "mobile": "9823158709", "email": "kiran.kakde@hpcl.co.in" },
                    "roManager": { "name": "Pravin Nikam", "mobile": "9867452310", "email": "pravin.nikam@hpcl.co.in" },
                    "saName": "Jalna",
                    "salesOfficer": { "name": "Deepali Pawar", "mobile": "9823456790", "email": "deepali.pawar@hpcl.in" },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["Mahalaxmi Fuel", "Sai Fuel Point"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "416983210",
                    "name": "Shri Sai Petroleum",
                    "address": "New Mondha, Jalna",
                    "district": "Jalna",
                    "dealer": { "name": "Pradeep Raut", "mobile": "9823156489", "email": "pradeep.raut@hpcl.co.in" },
                    "roManager": { "name": "Snehal Patil", "mobile": "9873214590", "email": "snehal.patil@hpcl.co.in" },
                    "saName": "Jalna",
                    "salesOfficer": { "name": "Manish Korde", "mobile": "9812456732", "email": "manish.korde@hpcl.in" },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["Sai Auto", "Omkar Fuels"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "418320749",
                    "name": "SKGs Sai Siddhi Petroleum",
                    "address": "Shirdi, Ahmednagar",
                    "district": "Ahmednagar",
                    "dealer": { "name": "Suresh Kadam", "mobile": "9823654981", "email": "suresh.kadam@hpcl.co.in" },
                    "roManager": { "name": "Madhuri Gaikwad", "mobile": "9812765432", "email": "madhuri.gaikwad@hpcl.co.in" },
                    "saName": "Shirdi",
                    "salesOfficer": { "name": "Rajesh Patil", "mobile": "9876543120", "email": "rajesh.patil@hpcl.in" },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["Balaji Petroleum", "Sai Auto Care"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "412504376",
                    "name": "Sneh Petroleum",
                    "address": "Sangamner, Ahmednagar",
                    "district": "Ahmednagar",
                    "dealer": { "name": "Rajendra Pawar", "mobile": "9821456789", "email": "rajendra.pawar@hpcl.co.in" },
                    "roManager": { "name": "Komal Jagtap", "mobile": "9812786543", "email": "komal.jagtap@hpcl.co.in" },
                    "saName": "Shirdi",
                    "salesOfficer": { "name": "Mahesh Patil", "mobile": "9823451769", "email": "mahesh.patil@hpcl.in" },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 21,
                    "nearbyOutlets": ["Om Service Station", "Sai Motors"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "414722037",
                    "name": "Junjhunwala Traders",
                    "address": "Khamgaon, Buldhana",
                    "district": "Buldhana",
                    "dealer": { "name": "Akhilesh Sharma", "mobile": "9876543123", "email": "akhilesh.sharma@hpcl.co.in" },
                    "roManager": { "name": "Sneha Joshi", "mobile": "9812376514", "email": "sneha.joshi@hpcl.co.in" },
                    "saName": "Akola",
                    "salesOfficer": { "name": "Pankaj Bhagat", "mobile": "9823561479", "email": "pankaj.bhagat@hpcl.in" },
                    "noOfCSAs": 11,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 17,
                    "nearbyOutlets": ["Sai Traders", "Mahalaxmi Fuel"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "417093504",
                    "name": "Shri Seva Petroleum",
                    "address": "Chainchkhed, Akola",
                    "district": "Akola",
                    "dealer": { "name": "Laxman Rathod", "mobile": "9823156409", "email": "laxman.rathod@hpcl.co.in" },
                    "roManager": { "name": "Pooja Deshmukh", "mobile": "9812789654", "email": "pooja.deshmukh@hpcl.co.in" },
                    "saName": "Akola",
                    "salesOfficer": { "name": "Ganesh Bhise", "mobile": "9823457689", "email": "ganesh.bhise@hpcl.in" },
                    "noOfCSAs": 13,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["Om Petroleum", "Suyog Fuels"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "417849301",
                    "name": "Mauli Petroleum",
                    "address": "Washim, Akola",
                    "district": "Washim",
                    "dealer": { "name": "Suresh Bhoyar", "mobile": "9823165479", "email": "suresh.bhoyar@hpcl.co.in" },
                    "roManager": { "name": "Sneha Jadhav", "mobile": "9812374568", "email": "sneha.jadhav@hpcl.co.in" },
                    "saName": "Akola",
                    "salesOfficer": { "name": "Nitin Kale", "mobile": "9823451690", "email": "nitin.kale@hpcl.in" },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 18,
                    "nearbyOutlets": ["Sai Service", "Auto Fuel Point"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "418902547",
                    "name": "Hind Super",
                    "address": "Paithan Road, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Sameer Khopade", "mobile": "9823147590", "email": "sameer.khopade@hpcl.co.in" },
                    "roManager": { "name": "Meena Gawande", "mobile": "9812764590", "email": "meena.gawande@hpcl.co.in" },
                    "saName": "Aurangabad-1",
                    "salesOfficer": { "name": "Sagar Dhotre", "mobile": "9823146578", "email": "sagar.dhotre@hpcl.in" },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["Sai Highway", "Balaji Petroleum"]
                },
                {
                    "region": "Aurangabad",
                    "sapCode": "419805213",
                    "name": "Narmada",
                    "address": "Beed Bypass, Aurangabad",
                    "district": "Aurangabad",
                    "dealer": { "name": "Nisha Rathore", "mobile": "9823146580", "email": "nisha.rathore@hpcl.co.in" },
                    "roManager": { "name": "Ajay Kulkarni", "mobile": "9812789650", "email": "ajay.kulkarni@hpcl.co.in" },
                    "saName": "Aurangabad-2",
                    "salesOfficer": { "name": "Vaibhav Pawar", "mobile": "9823164750", "email": "vaibhav.pawar@hpcl.in" },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["Sai Auto Care", "Shree Motors"]
                }
            ]
        };

        // Add zone reference to each outlet
        // ✅ Transform to match Outlet schema
        const outlets = rawData.outlets.map((o) => ({
            name: o.name.trim(),
            code: generateSapCode(),
            zone: o.region === "Aurangabad" ? AURANGABAAD_ZONE_ID : null,
            address: o.address,
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

        // Clear existing outlets for this zone
        await Outlet.deleteMany({ zone: AURANGABAAD_ZONE_ID });
        console.log('Cleared existing outlets for Aurangabaad zone');

        // Insert new outlets
        const result = await Outlet.insertMany(outlets);
        console.log(`Successfully seeded ${result.length} outlets for Aurangabaad zone`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding outlets:', error);
        process.exit(1);
    }
};

seedOutlets();