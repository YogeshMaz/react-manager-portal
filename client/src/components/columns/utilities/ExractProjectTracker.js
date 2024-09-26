export default function extractProjectTracker(projectTracker) {
    const regex = /<h>(.*?)<\/h>/;
    const match = projectTracker.match(regex);
    
    // Return the extracted percentage or "-" if not found
    return match ? match[1] : "-";
  }
  