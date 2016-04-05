# Sample Calendar Exercise

This is my (unfinished) implementation of the calendar exercise as specified by the PDF.

## List of any requirements you could not implement
* I didn't implement requirement 4 (holidays) and 5 (extra credit). Partly because of the time constraint, and partly because of chrome not allowing cross-domain requests (localhost to http://holidayapi.com/). The ajax call works, but there is never any data because chrome blocks it, so I didn't implement the rest of the code that depends on that data (coloring the cells orange).

## Bugs you’ve identified but didn’t have time to fix
* I have some input validation, but there are a few details missing (not allowing empty values most notably). The CSS could also use some work so that it looks closer to the example. The main issue is the CORS thing though. I wasn't able to complete the AJAX request.

## Things you would do if you had more time to complete the task
* Figure out a way to hackishly allow cross-domain requests to work for localhost. Ideally though, this app would be running on a real server, where CORS policy could be properly mitigated.

* Also, I'd make the CSS prettier and the validation more robust.

* Last but not least, I would of course finish the holiday thing.
