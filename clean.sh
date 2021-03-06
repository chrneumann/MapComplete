#! /bin/bash

# clean up the mess we made
 # rm *.js
 # rm Logic/*.js
 # rm Logic/*.js
 # rm Logic/*/*.js
 # rm Logic/*/*/*.js
 # rm UI/*.js
 # rm UI/*/*.js
 # rm UI/*/*/*.js
 # rm Customizations/*.js
 # rm Customizations/*/*.js
 # rm Customizations/*/*/*.js

rm *.webmanifest

# rm assets/generated/*

for f in ./*.html; do
    if [[ "$f" == "./index.html" ]] || [[ "$f" == "./land.html" ]] || [[ "$f" == "./test.html" ]] || [[ "$f" == "./preferences.html" ]] || [[ "$f" == "./customGenerator.html" ]]
    then
        echo "Not removing $f"
    else
        rm $f
    fi
done

rm -rf .cache