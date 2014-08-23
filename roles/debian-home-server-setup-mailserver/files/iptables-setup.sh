#!/bin/sh
sudo iptables -t nat -A PREROUTING -p tcp --dport 25 -j REDIRECT --to-ports 2525
# sudo iptables -t nat -L
