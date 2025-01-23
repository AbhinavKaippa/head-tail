## Modify head function

# should work

- deno head.js sample.txt
- deno head.js -n20 sample.txt
- deno head.js -n 20 sample.txt

# shouldn't work

- deno head.js -n sample.txt
- deno head.js -n sample.txt 20
- deno head.js -nsomething sample.txt

# guidelines

- [ ] Testing

  - [ ] Separate test file per src file
  - [ ] describe/it naming conventions

    - [ ] Name behaviour over values
      - Correct:
        it('should extract as many lines as the file size when file is smaller than count option')
      - Incorrect:
        it('should give 5 lines for head(- [ ]n,ten_lines.txt))

  - [x] assertThrows
    - use assertThrows to test errors that are being thrown from Deno.readTextFileSync
  - [x] mock in beforeEach

- [x] No strings. Only strings at entry/exit
- [ ] Consider enriching data in stages
- [ ] Validation can happen in more than one place
- [x] Decide wisely between objects and arrays.
  - Do you have an order?
  - Do you have names?
- [x] No need to throw errors. Errors can be handled by returning values as well.
- [ ] Test units. Each separate stage can be tested on its own by assuming that the other stages work well.
- [ ] Use console.error to print to error stream
- [ ] Use Deno.exit while exiting
- [ ] Throwing errors
  - throw richer objects

# need to be done

- [ ] write testcases
- [x] give error messages
- [ ] try differently
- [ ] test case for new takeLines Fn

- [ ] test for multiple functions
- [ ] test for --n
- [ ] edit readme
- [ ] explore vs code settings
- [ ] give commands to non using functions
- test case for formatArgument in utilityFunction
  - [x] test for errors
- [ ] modify mocking
