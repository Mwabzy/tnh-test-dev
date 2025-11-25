const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'doctors.json');
const backupPath = path.join(__dirname, '..', 'src', 'data', 'doctors.json.bak');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8');
}

const firstNames = ['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','William','Elizabeth','David','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Charles','Karen','Christopher','Nancy','Daniel','Lisa','Matthew','Betty','Anthony','Margaret','Mark','Sandra'];
const lastNames = ['Mwangi','Wanjiru','Otieno','Kuria','Kahumbu','Ouma','Njuguna','Cheruiyot','Omondi','Muthui','Karanja','Wabwire','Wekesa','Kamau','Mwanza','Owino','Kiptoo','Osei','Mensah','Adongo','Ndegwa','Kilonzo','Muriuki','Mutua','Munyao','Githinji','Magoha','Ngugi','Njenga','Mwangi'];

function makeName(i) {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  return `${fn} ${ln}`;
}

function phoneFor(i) {
  const base = 700000000 + i;
  return `+254${base}`;
}

function emailFor(name, i) {
  const s = name.toLowerCase().replace(/[^a-z]/g, '.');
  return `${s}${i}@nbihosp.org`;
}

function main() {
  if (!fs.existsSync(dataPath)) {
    console.error('doctors.json not found at', dataPath);
    process.exit(1);
  }

  const existing = readJson(dataPath);
  // backup
  fs.copyFileSync(dataPath, backupPath);
  console.log('Backup saved to', backupPath);

  const target = 50;
  const out = existing.slice();

  // add synthetic entries until we reach target
  let i = 0;
  while (out.length < target) {
    const name = makeName(i + out.length + 1);
    const entry = {
      name,
      title: 'Dr.',
      image: '',
      bio: `${name} is a Consultant at The Nairobi Hospital, practicing in their speciality area and offering patient-centred care.`,
      specialization: 'Consultant',
      medicalQualifications: 'MBChB',
      yearsOfExperience: `${5 + (i % 20)} years`,
      languagesSpoken: 'English, Swahili',
      contactEmail: emailFor(name, i + out.length + 1),
      contactPhone: phoneFor(i + out.length + 1).slice(0,13),
      clinicDepartment: 'Anderson Specialty',
      schedule: 'On request',
      location: 'Anderson Specialty, Main Hospital',
      licensingDetails: 'KMPDC',
      servicesOffered: [],
      awardsAndRecognition: '',
      researchAndPublications: '',
      socialMedia: '',
      affiliatedClinic: 'Anderson Specialty'
    };

    out.push(entry);
    i += 1;
    if (i > 200) break; // safety
  }

  // Sort alphabetically by name
  out.sort((a,b) => a.name.localeCompare(b.name));

  writeJson(dataPath, out);
  console.log(`Wrote ${out.length} doctors to ${dataPath}`);
}

main();
