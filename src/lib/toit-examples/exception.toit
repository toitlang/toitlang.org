main:
  connection ::= device.ConsoleConnection.open
  try:
    accelerometer := Accelerometer.start
  finally:
    connection.close