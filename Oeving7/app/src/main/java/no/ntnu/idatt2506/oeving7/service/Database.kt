package no.ntnu.idatt2506.oeving7.service

import android.content.Context
import no.ntnu.idatt2506.oeving7.managers.DatabaseManager

class Database(context: Context) : DatabaseManager(context) {

    init {
        try {
            this.clear()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    val allActors: ArrayList<String>
        get() = performQuery(TABLE_ACTOR, arrayOf(ACTOR_NAME))

    val allMovies: ArrayList<String>
        get() = performQuery(TABLE_MOVIE, arrayOf(MOVIE_TITLE), null)

    val allMoviesAndDirectors: ArrayList<String>
        get() {
            val select = arrayOf("$TABLE_MOVIE.$MOVIE_TITLE", "$TABLE_DIRECTOR.$DIRECTOR_NAME")
            val from = arrayOf(TABLE_DIRECTOR, TABLE_MOVIE)
            val join = JOIN_DIRECTOR_MOVIE

            return performRawQuery(select, from, join)
        }

    val allMoviesAndActors: ArrayList<String>
        get() {
            val select = arrayOf("$TABLE_MOVIE.$MOVIE_TITLE", "$TABLE_ACTOR.$ACTOR_NAME")
            val from = arrayOf(TABLE_ACTOR, TABLE_MOVIE, TABLE_ACTOR_MOVIE)
            val join = JOIN_ACTOR_MOVIE

            return performRawQuery(select, from, join)
        }

    fun getMoviesByActor(actor: String): ArrayList<String> {
        val select = arrayOf("$TABLE_MOVIE.$MOVIE_TITLE")
        val from = arrayOf(TABLE_ACTOR, TABLE_MOVIE, TABLE_ACTOR_MOVIE)
        val join = JOIN_ACTOR_MOVIE
        val where = "$TABLE_ACTOR.$ACTOR_NAME='$actor'"

        return performRawQuery(select, from, join, where)
    }

    fun getActorsByMovie(title: String): ArrayList<String> {
        val select = arrayOf("$TABLE_ACTOR.$ACTOR_NAME")
        val from = arrayOf(TABLE_ACTOR, TABLE_MOVIE, TABLE_ACTOR_MOVIE)
        val join = JOIN_ACTOR_MOVIE
        val where = "$TABLE_MOVIE.$MOVIE_TITLE='$title'"

        /*
        You can also just write out the querys manually like below, but this increases the chance of
        spelling mistakes and, creates a lot of work if you want to change names of fields etc.
        later.
         */
        val query =
            "SELECT AUTHOR.name FROM AUTHOR, BOOK, AUTHOR_BOOK " + "WHERE AUTHOR._id = AUTHOR_BOOK.author_id " + "and BOOK._id = AUTHOR_BOOK.book_id " + "and BOOK.title = '$title'"

        return performRawQuery(select, from, join, where)
    }

    fun getMoviesByDirector(director: String): ArrayList<String> {
        val select = arrayOf("$TABLE_MOVIE.$MOVIE_TITLE")
        val from = arrayOf(TABLE_DIRECTOR, TABLE_MOVIE)
        val join = JOIN_DIRECTOR_MOVIE
        val where = "$TABLE_DIRECTOR.$DIRECTOR_NAME='$director'"

        return performRawQuery(select, from, join, where)
    }
}