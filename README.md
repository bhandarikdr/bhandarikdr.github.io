# My personal site
This website is made with [Hugo](https://gohugo.io), a static site generator.

The theme used is [hugo DPSG](https://github.com/pfadfinder-konstanz/hugo-dpsg) which is a fork of [Mainroad Hugo theme](https://github.com/Vimux/Mainroad).

To learn more about hugo visit its documentation: https://gohugo.io/documentation/

## Installation

Download hugo from [here](https://gohugo.io/getting-started/installing/#windows), here is a [video tutorial](https://youtu.be/G7umPCU-8xc).

### Clone this repository
```sh
git clone --recurse-submodules https://github.com/osac/osac.github.io
```

Then use,

```
go server -D
```

To open up a localhost server. Go to browser at http://localhost:1313 or the url specified in output to above command.

## Adding A blog post
Go to content/post/ folder. Copy existing post and give it new name.
Change the front matter tags to appropirate one and write your post in markdown.

If you need to add images, put them in /static/img/ folder by creating a directory same as post name and placing images inside that directory.

You can view your changes through the `go server -D` command as mentioned above.
