
for fn in `find apiresponses -type d -name "components"`; do 
	cd ./$fn
	cp -a * ../
	cd $PR/oo-static-server; 
done