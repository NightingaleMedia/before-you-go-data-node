# Node / Shell Script for Transforing Audio

[ 1 ] Node Crawls a Google Drive Directory for Semantic files names
[ 2 ] Node compares (soft-sync) data, only downloads what is missing
[ 3 ] ffmpeg transforms the audio to be generally the same volume, bitrate and channels
[ 4 ] Node generates a JSON manifest of all of the files which the larger app then uses as a "Dial Directory"

## FFMPEG Script

`````bash
           ffmpeg \
                    -i "$file" \
                    # applies filters, i tried one-lining these and it stopped working
                    -af highpass=f=200,acompressor=threshold=0.08:ratio=8:attack=200:release=2000:level_in=1,alimiter=level_in=3:limit=1 \
                    # makes sure the sample is 16bit
                    -sample_fmt s16 \
                    # outputs to tmp
                    "$dir/tmp/${file##*/}"
    ````
`````

## More docs to come. New Branch to change over to AWS
