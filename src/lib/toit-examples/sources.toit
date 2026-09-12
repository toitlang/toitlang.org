main:
  files := ["test.toit", "README.md", "main.toit"]
  sources := files.filter: it.ends-with ".toit"

  sources.sort.do: print it
