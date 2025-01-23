# HEAD

**NAME**

    head -- display first lines of a file

**SYNOPSIS**

```
    head [file]
```

**DESCRIPTION**

The `head` command is used to display the first 10 lines of the specified file. 

### Basic Functionality:

- **head [file]**
  - Displays the first 10 lines of the specified file.


**EXAMPLES**

1. Display the first 10 lines of a file:
   ```
   head example.txt
   ```
2. Display an error message when the file is misisng:
   ```
   head missing.txt
   head: missing.txt: No such file or directory
   ```


---

# TAIL

**NAME**

    tail -- display the last part of a file

**SYNOPSIS**

```
    tail [file]
```

**DESCRIPTION**

The `tail` command is used to display the last 10 lines of the specified file. 

### Basic Functionality:

- **tail [file]**
  - Displays the last 10 lines of the specified file.

**EXAMPLES**

1. Display the last 10 lines of a file:
   ```
   tail example.txt
   ```
2. Display an error message when the file is misisng:
   ```
   tail missing.txt
   tail: missing.txt: No such file or directory
   ```

