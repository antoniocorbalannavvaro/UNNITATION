#!/bin/bash

function testApiEntryPoint() {
	cols=`tput cols`
	bar=""
	
	for x in `seq 1 $cols`
	do
		bar="${bar}#"
	done
	
	textBegin="# $1"
	textEnd="#"
	let fillChars=$cols-${#textBegin}-${#textEnd}
	
	textMiddle=""
	for x in `seq 1 $fillChars`
	do
		textMiddle="${textMiddle} "
	done
	
	echo $bar
	echo "${textBegin}${textMiddle}${textEnd}"
	echo $bar
	echo
	$1
	echo
}

testApiEntryPoint user/invite.sh
testApiEntryPoint user/accept.sh
testApiEntryPoint user/info.sh
testApiEntryPoint user/list.sh

testApiEntryPoint label/create.sh
testApiEntryPoint label/list.sh

testApiEntryPoint video/upload.sh
testApiEntryPoint video/list.sh

testApiEntryPoint experiment/create-1.sh
testApiEntryPoint experiment/list.sh
testApiEntryPoint experiment/abort.sh
testApiEntryPoint experiment/create-2.sh
testApiEntryPoint experiment/list.sh

testApiEntryPoint annotation/info.sh
testApiEntryPoint annotation/add-event.sh
testApiEntryPoint annotation/end.sh

echo "All test performed"
