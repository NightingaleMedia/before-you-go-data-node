        for file in $dir/*.wav; 
            do 
                ffmpeg \
                    -i "$file" \
                    # applies filters, i tried one-lining these and it stopped working
                    -af highpass=f=200,acompressor=threshold=0.08:ratio=8:attack=200:release=2000:level_in=1,alimiter=level_in=3:limit=1 \
                    # makes sure the sample is 16bit
                    -sample_fmt s16 \
                    # outputs to tmp
                    "$dir/tmp/${file##*/}"
        done