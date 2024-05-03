export const getTimeDetails = (updatedAt) => {
  const updatedAtDate = new Date(updatedAt * 1000);
  const hours = updatedAtDate.getHours();
  const minutes = updatedAtDate.getMinutes();
  const Median = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${Median}`;

  return formattedTime;
};
export const getTime = (updatedAt) => {
  const updatedAtDate = new Date(updatedAt * 1000);
  const hours = updatedAtDate.getHours();
  const minutes = updatedAtDate.getMinutes();

  return { hours, minutes };
};

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    const reader = new FileReader();

    // Reading done
    reader.onload = (event) => {
      const contents = event.target.result;
      if (file.size < 5 * 1024) {
        resolve({ contents, isBelowThreshold: true });
      } else {
        resolve({ contents, isBelowThreshold: false });
      }
    };

    reader.onerror = (event) => {
      reject(new Error("Error reading file."));
    };

    // Read the file as text
    reader.readAsText(file);
  });
};

export const parseEnvVariables = (contents) => {
  const lines = contents.split("\n");
  const variables = lines.map((line) => {
    const [name, value] = line.split("=");
    return { name, value };
  });
  return variables;
};
