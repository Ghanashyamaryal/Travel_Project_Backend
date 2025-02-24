import Hotel from "../model/Hotel.model.js";
import Destination from "../model/Destination.model.js";
import Trek from "../model/Trek.model.js";
import Package from "../model/Packages.model.js";

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

export const searchController = async (req, res) => {
    try {
        const { q } = req.query; 

        if (!q || q.trim().length < 1) {
            return res.status(400).json({ message: "Search query must be at least 1 character long." });
        }

        const cleanQuery = q.trim().toLowerCase();
        const searchQuery = escapeRegex(cleanQuery);
        const isCategorySearch = /^(hotels?|destinations?|treks?|packages?)$/.test(cleanQuery);

        if (isCategorySearch) {
            const categoryMap = {
                hotel: () => Hotel.find().limit(10),
                hotels: () => Hotel.find().limit(10),
                destination: () => Destination.find().limit(10),
                destinations: () => Destination.find().limit(10),
                trek: () => Trek.find().limit(10),
                treks: () => Trek.find().limit(10),
                package: () => Package.find().limit(10),
                packages: () => Package.find().limit(10),
            };

            const category = cleanQuery.replace(/s$/, ''); 
            if (categoryMap[category]) {
                const results = await categoryMap[category]();
                return res.json({ success: true, results: { [`${category}s`]: results } });
            }
        }

        const exactRegex = new RegExp(`^${searchQuery}$`, "i");
        const [exactHotel, exactDest, exactTrek, exactPackage] = await Promise.all([
            Hotel.findOne({ name: exactRegex }),
            Destination.findOne({ name: exactRegex }),
            Trek.findOne({ name: exactRegex }),
            Package.findOne({ title: exactRegex }) 
        ]);

        const exactResults = {
            hotels: exactHotel ? [exactHotel] : [],
            destinations: exactDest ? [exactDest] : [],
            treks: exactTrek ? [exactTrek] : [],
            packages: exactPackage ? [exactPackage] : []
        };

        if (Object.values(exactResults).some(arr => arr.length > 0)) {
            return res.json({ success: true, results: exactResults });
        }

        const partialRegex = new RegExp(searchQuery, "i");
        const [hotels, destinations, treks, packages] = await Promise.all([
            Hotel.find({ name: partialRegex }).limit(10),
            Destination.find({ name: partialRegex }).limit(10),
            Trek.find({ name: partialRegex }).limit(10),
            Package.find({ title: partialRegex }).limit(10)
        ]);

        return res.json({
            success: true,
            results: { hotels, destinations, treks, packages }
        });

    } catch (error) {
        console.error("Search error:", error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    }
};
