const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const CDN = "https://res.cloudinary.com/c1lcuefp/image/upload/f_auto,q_auto";

const sampleBooks = [
    // ===== Books with verified Cloudinary covers =====
    { title: "ፍቅር እስከ መቃብር", author: "ሀዲስ ዓለማየሁ", price: 12.99, category: "Fiction", stock: 8, description: "A beloved Amharic novel.", coverImage: `${CDN}/ፍቅር_እስከ_መቃብር` },
    { title: "ከአድማስ ባሻገር", author: "በዓሉ ግርማ", price: 14.99, category: "Fiction", stock: 10, description: "A classic novel by Bealu Girma.", coverImage: `${CDN}/ከአድማስ` },
    { title: "የተቆለፈበት ቁልፍ", author: "ምህረት ደበበ", price: 15.50, category: "Fiction", stock: 5, description: "A powerful story by Mihret Debebe.", coverImage: `${CDN}/የተቆለፈበት_ቁልፍ` },
    { title: "ትኩሳት", author: "ስብሐት ገብረ እግዚአብሔር", price: 16.00, category: "Fiction", stock: 7, description: "A masterpiece by Sibhat Gebre-Egziabher.", coverImage: `${CDN}/ትኩሳት` },
    { title: "እመጓ", author: "ዓለማየሁ ዋሴ", price: 13.99, category: "Fiction", stock: 6, description: "A classic Amharic novel.", coverImage: `${CDN}/እመጓ` },
    { title: "ኦሮማይ", author: "በዓሉ ግርማ", price: 17.99, category: "Historical Fiction", stock: 4, description: "A deeply moving novel by Bealu Girma.", coverImage: `${CDN}/ኦሮማይ` },
    { title: "የቀይ ኮከብ ጥሪ", author: "በዓሉ ግርማ", price: 17.00, category: "Historical Fiction", stock: 4, description: "A novel set against political change.", coverImage: `${CDN}/የቀይ_ኮከብ_ጥሪ` },
    { title: "የልምዣት", author: "ሀዲስ ዓለማየሁ", price: 12.99, category: "Fiction", stock: 9, description: "A classic novel by Hadis Alemayehu.", coverImage: `${CDN}/የልምዣት` },

    // ===== Other books (existing covers) =====
    { title: "ከአሜን ባሻገር", author: "በዕውቀቱ ስዩም", price: 14.50, category: "Fiction", stock: 9, description: "A novel by Bewketu Seyoum.", coverImage: `${CDN}/ከአሜን_ባሻገር` },
    { title: "Dertogada", author: "ይስማዕከ ወርቁ", price: 18.99, category: "Fiction", stock: 3, description: "A critically acclaimed novel.", coverImage: `${CDN}/Dertogada` },
    { title: "ሌላሠው", author: "ምህረት ደበበ", price: 14.00, category: "Fiction", stock: 5, description: "A novel by Mihret Debebe.", coverImage: `${CDN}/ሌላሠው` },
    { title: "ደራሲው", author: "በዓሉ ግርማ", price: 15.99, category: "Fiction", stock: 7, description: "A classic work by Bealu Girma.", coverImage: `${CDN}/ደራሲው` },
    { title: "እሳት ወይ አበባ", author: "ፀጋዬ ገብረ መድኅን", price: 13.50, category: "Poetry", stock: 8, description: "A poetry collection.", coverImage: `${CDN}/እሳት_ወይ_አበባ` },
    { title: "ግራጫ ቃጭሎች", author: "አዳም ረታ", price: 16.50, category: "Fiction", stock: 5, description: "A novel by Adam Reta.", coverImage: `${CDN}/ግራጫ_ቃጭሎች` },
    { title: "እንቅልፍ እና ዕድሜ", author: "በዕውቀቱ ስዩም", price: 15.00, category: "Fiction", stock: 6, description: "A novel by Bewketu Seyoum.", coverImage: `${CDN}/እንቅልፍ_እና_ዕድሜ` },
    { title: "መልክአ ስብሐት", author: "ዓለማየሁ ገላጋይ", price: 11.99, category: "Fiction", stock: 8, description: "A novel by Alemayehu Gelagay.", coverImage: `${CDN}/መልክአ_ስብሐት` },
    { title: "አደፍርስ", author: "ዳኛቸው ወርቁ", price: 14.99, category: "Fiction", stock: 7, description: "A novel by Dagnachew Worku.", coverImage: `${CDN}/አደፍርስ` },
    { title: "መግባት እና መውጣት", author: "በዕውቀቱ ስዩም", price: 16.50, category: "Fiction", stock: 5, description: "A novel by Bewketu Seyoum.", coverImage: `${CDN}/መግባት_እና_መውጣት` },
    { title: "ሌቱም አይነጋልኝ", author: "ስብሐት ገብረ እግዚአብሔር", price: 15.99, category: "Fiction", stock: 6, description: "A novel by Sibhat Gebre-Egziabher.", coverImage: `${CDN}/ሌቱም_አይነጋልኝ` },
    { title: "መረቅ", author: "አዳም ረታ", price: 13.99, category: "Fiction", stock: 7, description: "A novel by Adam Reta.", coverImage: `${CDN}/መረቅ` },
    { title: "እቴሜቴ ሎሚ ሽታ", author: "አዳም ረታ", price: 15.50, category: "Fiction", stock: 5, description: "A novel by Adam Reta.", coverImage: `${CDN}/እቴሜቴ_ሎሚ_ሽታ` },
    { title: "የቢሾፍቱ ቆሪጦች", author: "ተስፋዬ ገብረአብ", price: 12.99, category: "Children's", stock: 12, description: "A story for young readers.", coverImage: `${CDN}/የቢሾፍቱ_ቆሪጦች` },
    { title: "አለንጋና ምስር", author: "አዳም ረታ", price: 13.99, category: "Fiction", stock: 6, description: "A novel by Adam Reta.", coverImage: `${CDN}/አለንጋና_ምስር` },
    { title: "የኤርትራ ጉዳይ", author: "ዘውዴ ረታ", price: 18.00, category: "History", stock: 5, description: "A historical work.", coverImage: `${CDN}/የኤርትራ_ጉዳይ` },
    { title: "ወንጀለኛው ዳኛ", author: "ሀዲስ ዓለማየሁ", price: 15.99, category: "Fiction", stock: 6, description: "A classic novel by Hadis Alemayehu.", coverImage: `${CDN}/ወንጀለኛው_ዳኛ` },
    { title: "አንድ ለናቱ", author: "አቤ ጉበኛ", price: 12.99, category: "Fiction", stock: 8, description: "A novel by Abe Gubegna.", coverImage: `${CDN}/አንድ_ለናቱ` },
    { title: "ጠጠሮቹ እና ሌሎች", author: "ዳንኤል ክብረት", price: 11.50, category: "Short Stories", stock: 10, description: "Short stories by Daniel Kibret.", coverImage: `${CDN}/ጠጠሮቹ_እና_ሌሎች_-_ዳንኤል_ክብረት` },
    { title: "የቃየን መሥዋዕት", author: "ሠርቅ ዳንኤል", price: 14.00, category: "Fiction", stock: 7, description: "A novel by Serk Daniel.", coverImage: `${CDN}/የቃየን_መሥዋዕት` },
    { title: "ትዝታ", author: "ሀዲስ ዓለማየሁ", price: 15.00, category: "Biography", stock: 5, description: "A memoir by Hadis Alemayehu.", coverImage: `${CDN}/ሀዲስ_አለማየሁ_ትዝታ_1.jpg` },
    { title: "ሰባተኛው መልአክ", author: "ስብሐት ገብረ እግዚአብሔር", price: 16.99, category: "Fiction", stock: 4, description: "A novel by Sibhat Gebre-Egziabher.", coverImage: `${CDN}/1_ስብሐት_ገብረ_እግዚአብሔር_ሰባተኛው_መልአክ.jpg` },
    { title: "አብዮቱና ትዝታዬ", author: "ፍሥሐ ደስታ", price: 17.99, category: "History", stock: 6, description: "A historical account.", coverImage: `${CDN}/አብዮቱ_እና_ትዝታየ` },
    { title: "ዙቤይዳ", author: "አሌክስ አብርሃም", price: 14.99, category: "Fiction", stock: 8, description: "A novel by Alex Abraham.", coverImage: `${CDN}/zubeyda` },
    { title: "ባሕረ ሐሳብ", author: "ሀዲስ ዓለማየሁ", price: 15.99, category: "Poetry", stock: 7, description: "A poetry collection.", coverImage: `${CDN}/ባሕረ_ሐሳብ` },
    { title: "ጥቁር አንበሳ", author: "ዳንኤል ክብረት", price: 12.50, category: "Fiction", stock: 10, description: "A novel by Daniel Kibret.", coverImage: `${CDN}/download_ዳን` },
    { title: "ሰመመን", author: "ሲሳይ ንጉሱ", price: 13.99, category: "Poetry", stock: 9, description: "A poetry collection.", coverImage: `${CDN}/ሰመመን` },
    { title: "ልጅነት", author: "ዘነበ ወላ", price: 13.99, category: "Poetry", stock: 9, description: "A poetry collection.", coverImage: `${CDN}/ልጅነት` },
];

mongoose
    .connect(process.env.MONGO_URI)
    .then(async() => {
        console.log("🔄 Connected to MongoDB. Clearing old books...");
        await Book.deleteMany({});
        console.log("✅ Old books cleared.");

        console.log(`📚 Inserting ${sampleBooks.length} books...`);
        const created = await Book.insertMany(sampleBooks);
        console.log(`🎉 Successfully inserted ${created.length} books!`);

        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Error:", err.message);
        process.exit(1);
    });