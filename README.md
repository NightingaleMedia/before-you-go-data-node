# Node / Shell Script for Transforing Audio

- [ ] Node Crawls a Google Drive Directory for Semantic files names
- [ ] Node compares (soft-sync) data, only downloads what is missing
- [ ] ffmpeg transforms the audio to be generally the same volume, bitrate and channels
- [ ] Node generates a JSON manifest of all of the files which the larger app then uses as a "Dial Directory"

## FFMPEG Script

```bash
    ffmpeg \
            -i "$file" \
            # applies filters, i tried one-lining these and it stopped working
            -af highpass=f=200,acompressor=threshold=0.08:ratio=8:attack=200:release=2000:level_in=1,alimiter=level_in=3:limit=1 \
            # makes sure the sample is 16bit
            -sample_fmt s16 \
            # outputs to tmp
            "$dir/tmp/${file##*/}"
```

## Sample Manifest

Sits at the top level of the "data" folder.

```json
// */data/manifest.json
{
  "0": {
    "description": "",
    "name": "00_aboutus",
    "index": 0,
    "files": ["description_other_data.wav"]
  },
  "1": {
    "description": "",
    "name": "01_advice",
    "index": 1,
    "files": ["description_other_data2.wav"]
  },
  "2": {
    "description": "",
    "name": "02_rememberaboutme",
    "index": 2,
    "files": ["description_other_data.wav"]
  },
  "3": {
    "description": "",
    "name": "03_helpingotherssmile",
    "index": 3,
    "files": ["description_other_data.wav"]
  },
  "4": {
    "description": "",
    "name": "04_relationshipwithdeath",
    "index": 4,
    "files": ["description_other_data.wav"]
  },
  "5": {
    "description": "",
    "name": "05_wishihaddone",
    "index": 5,
    "files": ["description_other_data.wav"]
  },
  "6": {
    "description": "",
    "name": "06_family",
    "index": 6,
    "files": ["description_other_data.wav"]
  },
  "7": {
    "description": "",
    "name": "07_travel",
    "index": 7,
    "files": ["description_other_data.wav"]
  },
  "8": {
    "description": "",
    "name": "08_faith",
    "index": 8,
    "files": ["description_other_data.wav"]
  },
  "9": {
    "description": "",
    "name": "09_Misc_thinkingdifferently",
    "index": 9,
    "files": ["description_other_data.wav"]
  }
}
```

## More docs to come. New Branch to change over to AWS
