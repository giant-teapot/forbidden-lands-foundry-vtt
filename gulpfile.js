const gulp = require("gulp");
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const sass = require("gulp-sass");
const argv = require("yargs");
const { watch } = require("fs-extra");

// Watch for changes to SCSS files
function watchSASS() {
    const SRC = ["src/styles/**/*.scss"];
    gulp.watch(SRC, gulp.series(buildCSS));
}

// Build CSS
function buildCSS() {
    const styles = ["layout", "style"];
    return styles.forEach((module) => {
        gulp.src(`src/styles/${module}/*.scss`)
            .pipe(sass())
            .pipe(gulp.dest("dist/styles/"));
    });
}

// Get system manifest for build.
function getManifest() {
    const json = { root: "dist" };

    const systemPath = path.join(json.root, "system.json");

    if (fs.existsSync(systemPath)) {
        json.file = fs.readJSONSync(systemPath);
        json.name = "system.json";
    } else {
        console.error("Uh oh, couldn't find system.json", error);
        return this.emit("end");
    }
    return json;
}
// Build a new Release Package.
async function buildRelease() {
    const manifest = getManifest();

    return new Promise((resolve, reject) => {
        try {
            // clean release dir
            if (argv.clean || argv.c) {
                fs.removeSync("release");
                return;
            }
            // ensure release dir exists
            fs.ensureDirSync("release");
            // Initialize Zip
            const zipName = `fbl_${manifest.file.version}.zip`;
            const zipFile = fs.createWriteStream(path.join("releast", zipName));
            const zip = archiver("zip", { zlib: { level: 9 } });
            // Write Zip file
            zipFile.on("close", () => {
                console.info(
                    `A release of size: ${zip.pointer} bytes, with name ${zipName}.zip has been created.`
                );
                return resolve();
            });
            zip.on("error", (err) => {
                throw err;
            });
            // Move zip to final resting place
            zip.pipe(zipFile);
            zip.directory("dist/", manifest.file.name);
            zip.finalize();
        } catch (error) {
            return reject(error);
        }
    });
}

exports.default = gulp.series(buildCSS, watchSASS);
exports.build = buildCSS;
exports.release = gulp.series(buildCSS, buildRelease);
