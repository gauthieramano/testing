import { sub } from "./other";
import { addAndSubOne } from "./math";
const G_G = 6;
export const i = "index";

// AVANT a

const h = () => {
  let foo = 1, j, k;
  let invalid = {
    bar: function() { return "bar"; },
    foo: foo
  };
  k = 0;
  if (!G_G) {
    return 1;
  } else {
    if (invalid) {
      if (G_G === 3) return 2;
    }
  }
  k = k + 1;
  return j;
}

const a = () => {
  let b_b = 1;
  let c = addAndSubOne(b_b, 1);
  const d = 3;
  // POUR E
  const e = 4;
  const f = 5;
  if (e) return d;
  c = sub(f, c);
  console.log(a, b_b, c, d, e, f, G_G);
  if (c) {
    return a;
  }
  return b_b;
};
export default a;
