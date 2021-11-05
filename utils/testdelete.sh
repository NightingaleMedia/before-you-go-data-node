for dir in ./data/*; 
    do
        echo "hi"
        for direct in $dir/*.wav;
            do
                for file in $direct/*.wav;
                    do
                        echo "$file"
                done
        done  
done