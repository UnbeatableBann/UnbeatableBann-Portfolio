import fs from "fs";
const content = fs.readFileSync(
  "C:\\Users\\Shadab\\Downloads\\UnbeatableBann-Portfolio\\temp\\mudit_contact_formatted.html",
  "utf8",
);

const regex = /class="([^"]+)"/g;
let match;
const classes = new Set();
while ((match = regex.exec(content)) !== null) {
  match[1].split(" ").forEach((cls) => {
    if (
      cls.includes("place") ||
      cls.includes("detail") ||
      cls.includes("compact") ||
      cls.includes("container") ||
      cls.includes("map")
    ) {
      classes.add(cls);
    }
  });
}
console.log("Matching classes:");
classes.forEach((c) => console.log("  " + c));
