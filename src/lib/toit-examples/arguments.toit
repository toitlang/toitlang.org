main arguments:
  if arguments.is-empty:
    print "Usage: greet.toit NAME ..."
    return

  arguments.do: |name|
    print "Hello, $name!"
