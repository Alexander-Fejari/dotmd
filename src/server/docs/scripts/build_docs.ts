import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import deepmerge from 'deepmerge';

const partsDir = path.resolve(process.cwd(), 'src/server/docs/yaml');
const baseFile = path.resolve(process.cwd(), 'src/server/docs/base.yaml');
const outputDir = path.resolve(process.cwd(), 'public/openApiMergedDocs');
const outputFile = path.join(outputDir, 'index.yaml');

// 1. Charger base.yaml
const baseContent = fs.readFileSync(baseFile, 'utf8');
const baseDoc = YAML.parse(baseContent);

// 2. Récupérer tous les fichiers .yaml dans le dossier /yaml
const partFiles = fs
  .readdirSync(partsDir)
  .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'));

// 3. Fusionner chaque partie dans le doc de base
const fullDoc = partFiles.reduce((acc, file) => {
  const filePath = path.join(partsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = YAML.parse(content);
  return deepmerge(acc, parsed);
}, baseDoc);

// 4. Sauvegarder le fichier final
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, YAML.stringify(fullDoc));
console.log(`✅ Swagger YAML merged to: ${outputFile}`);