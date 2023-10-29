package no.ntnu.idatt2506.oeving7

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import no.ntnu.idatt2506.oeving7.databinding.ActivityMainBinding
import no.ntnu.idatt2506.oeving7.managers.FileManager
import no.ntnu.idatt2506.oeving7.managers.MyPreferenceManager
import no.ntnu.idatt2506.oeving7.service.Database

class MainActivity : AppCompatActivity() {
    private lateinit var db: Database
    private lateinit var activityMain: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMain = ActivityMainBinding.inflate(layoutInflater)

        setContentView(activityMain.root)

        MyPreferenceManager(this).updateBackgroundColor(::setBackgroundColor)
        MyPreferenceManager(this).updateNightMode()

        db = Database(this)

        FileManager(this, db).readFileFromResFolder(R.raw.movies)
        FileManager(this, db).writeMoviesToFile()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.settings, menu)
        menu.add(0, 1, 0, "Alle skuespillere")
        menu.add(0, 2, 0, "Alle filmer")
        menu.add(0, 3, 0, "Alle filmer og regissører")
        menu.add(0, 4, 0, "Filmer med Harrison Ford")
        menu.add(0, 5, 0, "Skuespillere i \"Star Wars: A New Hope\"")
        menu.add(0, 6, 0, "Filmer av Steven Spielberg")

        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.settings -> startActivity(Intent(".SettingsActivity"))
            1 -> showResults(db.allActors, "Alle skuespillere")
            2 -> showResults(db.allMovies, "Alle filmer")
            3 -> showResults(db.allMoviesAndDirectors, "Alle filmer og regissører")
            4 -> showResults(db.getMoviesByActor("Harrison Ford"), "Filmer med Harrison Ford")
            5 -> showResults(db.getActorsByMovie("Star Wars: A New Hope"), "Skuespillere i \"Star Wars: A New Hope\"")
            6 -> showResults(db.getMoviesByDirector("Steven Spielberg"), "Filmer av Steven Spielberg")
            else -> return false
        }
        return super.onOptionsItemSelected(item)
    }

    override fun onResume() {
        super.onResume()
        MyPreferenceManager(this).updateBackgroundColor(::setBackgroundColor)
    }

    private fun showResults(list: ArrayList<String>, description: String) {
        val res = StringBuffer("")
        for (s in list) res.append("$s\n")
        activityMain.textView.text = res
        activityMain.description.text = description
    }

    private fun setBackgroundColor(color: String) {
        activityMain.layout.setBackgroundColor(Color.parseColor(color))

    }
}