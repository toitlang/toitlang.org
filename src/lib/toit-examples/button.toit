import gpio

main:
  button := gpio.Pin 18 --input --pull-up

  try:
    while true:
      button.wait-for 0
      print "Button pressed"
      button.wait-for 1
  finally:
    button.close
