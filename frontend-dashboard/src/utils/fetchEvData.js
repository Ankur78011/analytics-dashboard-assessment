import Papa from 'papaparse';

// Function to fetch CSV from the public directory and return parsed JSON
export async function fetchEvData(csvPath) {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const csvText = await response.text(); // Get CSV file content as text

    // Parse the CSV text into JSON
    const result = await new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        complete: (parsedResult) => resolve(parsedResult.data),
        error: (error) => reject(error),
        header: true, // Treat first row as header
      });
    });

    return result;  // Return parsed JSON data
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    throw error; // Propagate error
  }
}


