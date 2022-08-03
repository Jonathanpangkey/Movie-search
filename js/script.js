// search function
function searchMovie() {
	$("#movie-list").html("");

	// ajax request
	$.ajax({
		url: "https://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "dca61bcc",
			s: $("#search-input").val(),
		},
		success: function (result) {
			// if success add data use card bootstrap
			if (result.Response == "True") {
				let movies = result.Search;

				// loop the data use each
				$.each(movies, function (i, data) {
					$("#movie-list").append(`
                        <div class="col-md-4  mb-3">
                            <div class="card text-dark  h-100">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
				});

				// remove the value in input
				$("#search-input").val("");
			} 
			
			else {
				$("#movie-list").html(`
                    <div class="col">
                        <h1 class="text-center">` +
						result.Error +
						`</h1>
                    </div>
                `);

			}
		},
	});
}

// click event
$("#search-button").on("click", () => {
	searchMovie();
});

// enter event
$("#search-input").on("keyup", (e) => {
	if (e.key == "Enter") {
		searchMovie();
	}
});

// function for see detail
$("#movie-list").on("click", ".see-detail", function () {
	// ajax request
	$.ajax({
		url: "https://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "dca61bcc",
			i: $(this).data("id"),
		},
		success: function (movie) {
			if (movie.Response == "True") {
				// add modal body
				$(".modal-body").html(`
                <div class="container-fluid">
                <div class="row text-dark">
                    <div class="col-md-4">
                        <img src="` +
						movie.Poster +
						`" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>` +
						movie.Title +
						`</h3></li>
                            <li class="list-group-item">Released : ` +
						movie.Released +
						`</li>
                            <li class="list-group-item">Genre : ` +
						movie.Genre +
						`</li>                 
                            <li class="list-group-item">Director : ` +
						movie.Director +
						`</li>                 
                            <li class="list-group-item">Director : ` +
						movie.Actors +
						`</li>                 
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="mt-2 text-dark">
                        <p>` +
						movie.Plot +
						`</p>
                </div>
                </div>
                `);
			}
		},
	});
});
