# bijective-number v0.2.1

[![ci](https://github.com/kt3k/bijective-number/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/bijective-number/actions/workflows/ci.yml)

Convert numbers to
[bijective numbers](https://en.wikipedia.org/wiki/Bijective_numeration) of the
given alphabet. It uses lower 'a' to 'z' as the default alphabet.

```
0 -> (empty string)
1 -> a
2 -> b
...
25 -> y
26 -> z
27 -> aa
28 -> ab
...
52 -> az
53 -> ba
...
701 -> zy
702 -> zz
703 -> aaa
```

This system is used, for example, for labeling columns in Excel.

# Usage

Install to Deno by:

```sh
deno i jsr:@kt3k/bijective-number
```

Install to Node or other systems:

```sh
npx jsr add @kt3k/bijective-number
```

```js
import { decode, encode } from "@kt3k/bijective-number";

encode(0); // => ""
encode(1); // => a
encode(2); // => b
encode(26); // => z
encode(27); // => aa
encode(28); // => ab
encode(701); // => zy
encode(702); // => zz
encode(703); // => aaa
encode(704); // => aab

decode(""); // => 0n
decode("a"); // => 1n
decode("b"); // => 2n
decode("z"); // => 26n
decode("aa"); // => 27n
decode("ab"); // => 28n
decode("zy"); // => 701n
decode("zz"); // => 702n
decode("aaa"); // => 703n
decode("aab"); // => 704n
```

# LICENSE

MIT
