package no.ntnu.idatt2506.oeving4

import android.content.res.Configuration
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity(), ListFragment.OnFragmentInteractionListener {

    var index: Int = 0


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setOrientation(resources.configuration)
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        setOrientation(newConfig)
    }


    private fun setOrientation(config: Configuration) {
        supportFragmentManager.beginTransaction()
        if (config.orientation == Configuration.ORIENTATION_PORTRAIT) {
            findViewById<LinearLayout>(R.id.content).orientation = LinearLayout.VERTICAL

        } else {
            findViewById<LinearLayout>(R.id.content).orientation = LinearLayout.HORIZONTAL
        }

    }


    override fun onFragmentInteraction(position: Int?) {
        index = position?:0
        updatePoster()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.menu_previous -> previousPoster()
            R.id.menu_next -> nextPoster()
            else -> return false
        }
        return true
    }

    private fun nextPoster() {
        index++
        if (index > resources.getStringArray(R.array.titles).size - 1) index = 0
        updatePoster()
    }

    private fun previousPoster() {
        index--
        if (index < 0) index = resources.getStringArray(R.array.titles).size - 1
        updatePoster()

    }

    private fun updatePoster() {
        val descriptionFragment = supportFragmentManager.findFragmentById(R.id.description) as DescriptionFragment
        descriptionFragment.changePoster(index)
    }
}