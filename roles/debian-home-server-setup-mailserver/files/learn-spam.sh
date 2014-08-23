#!/bin/sh
MAIL_HOME=/home/augustl/srv/mail/augustl

learnSpam() {
    local mailf="$1"
    echo Spam: $mailf
    cat $mailf | dspam --mode=teft --user=augustl --class=spam --source=error --clasify
}

learnHam() {
    local mailf="$1"
    echo Ham: $mailf
    cat $mailf | dspam --mode=teft --user=augustl --class=innocent --source=error --clasify
}


for f in $MAIL_HOME/.SpamTrain/cur/*
do
    [ -f $f ] || return

    learnSpam $f
    mv $f $MAIL_HOME/.Spam/cur/
done

for f in $MAIL_HOME/.SpamTrain/new/*
do
    [ -f $f ] || return

    learnSpam $f
    mv $f $MAIL_HOME/.Spam/new/
done

for f in $MAIL_HOME/.HamTrain/cur/*
do
    [ -f $f ] || return

    learnHam $f
    mv $f $MAIL_HOME/cur/
done

for f in $MAIL_HOME/.HamTrain/new/*
do
    [ -f $f ] || return

    learnHam $f
    mv $f $MAIL_HOME/new/
done
