class UnneededPrivacy:
  // No point in making this private since
  // it has a trivial getter and setter.
  x_ /int  // Private member variable.

  constructor x/int:
    x_ = x

  // Getter.
  x -> int:
    return x_