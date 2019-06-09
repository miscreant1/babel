let a = () => "outside";

function f(x = a) {
  return x();
}

a();

