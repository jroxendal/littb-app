var app = new Vue({
  el: '#app',
  data() {
    return {
      books: [],
      filter: '',
      loading: true
    }
  },
  methods: {
    getBooks: function () {
      var self = this;
      loading = true;
      axios
        .get('https://litteraturbanken.se/api/list_all/etext', {
          params: {
            exclude: 'text,parts,sourcedesc,pages,errata',
            has_epub: true,
            include: 'lbworkid,titlepath,sortkey,title,title_id,work_title_id,shorttitle,mediatype,authors.author_id,authors.name_for_index,authors.authortype,startpagename,authors.surname,authors.full_name',
            sort_field: 'epub_popularity|desc',
            filter_string: self.filter,
            to: 20
          }
        })
        .then(function (response) {
          self.books = response.data.data;
          self.loading = false;
        });
    },
    getDownloadUrl: function (book) {
      var filename = (Litteraturbanken.normalizeString(book.authors[0].author_id)) + "_" + (Litteraturbanken.normalizeString(book.title_id)) + ".epub";
      var url = "https://litteraturbanken.se/txt/epub/" + filename;
      return url;
    },
    download: function (url) {
      window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        console.log('file system open: ' + fs.name);

        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        var url = 'http://cordova.apache.org/static/img/cordova_bot.png';
        // Parameters passed to getFile create a new file or return the file if it already exists.
        fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
          download(fileEntry, url, true);

        }, onErrorCreateFile);

      }, onErrorLoadFs);
    }
  },
  mounted() {
    this.getBooks();
  }
})