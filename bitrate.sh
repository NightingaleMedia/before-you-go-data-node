for dir in ./data/*; 
    # This deletes the tmp
    do
        if [ -d "$dir/tmp" ]
        then
            rm -r "$dir/tmp"
        fi
        mkdir "$dir/tmp"
        echo "$dir"
        # this runs the audio transform for all .wav
        for file in $dir/*.wav; 
            do 
                ffmpeg \
                    -i "$file" \
                    # applies filters
                    -af highpass=f=200,acompressor=threshold=0.08:ratio=8:attack=200:release=2000:level_in=1,alimiter=level_in=3:limit=1 \
                    # makes sure the sample is 16bit
                    -sample_fmt s16 \
                    # outputs to tmp
                    "$dir/tmp/${file##*/}"
        done
        # remove 24 bit
        for file in $dir/*.wav;
            do
                rm ${file##*/}
        done

        for file in "$dir/tmp/"
            do
                echo $file
        done
done

for dir in ./data/*; 
    do
        for direct in $dir;
            do
            # remove all the old files
                rm -f $direct/*
                for file in $direct/tmp/*;
                    do
                        mv $file $direct
                done
                rm -rf $direct/tmp
        done
done
