package no.ntnu.idatt2506.oeving7

import android.content.SharedPreferences
import android.graphics.Color
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.ListPreference
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import no.ntnu.idatt2506.oeving7.databinding.ActivitySettingsBinding
import no.ntnu.idatt2506.oeving7.managers.MyPreferenceManager

class SettingsActivity :
    AppCompatActivity(),
    SharedPreferences.OnSharedPreferenceChangeListener,
    Preference.SummaryProvider<ListPreference> {

    private lateinit var ui: ActivitySettingsBinding
    private lateinit var myPreferenceManager: MyPreferenceManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        myPreferenceManager = MyPreferenceManager(this)
        myPreferenceManager.registerListener(this)

        ui = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(ui.root)

        supportFragmentManager
            .beginTransaction()
            .replace(R.id.settings_container, SettingsFragment())
            .commit()

        ui.button.setOnClickListener {
            finish()
        }
        MyPreferenceManager(this).updateBackgroundColor(::setBackgroundColor)

    }

   override fun onSharedPreferenceChanged(sharedPreferences: SharedPreferences?, key: String?) {
        if (key == getString(R.string.background_color)) myPreferenceManager.updateBackgroundColor(::setBackgroundColor)
        if (key == getString(R.string.night_mode)) myPreferenceManager.updateNightMode()
    }


    override fun provideSummary(preference: ListPreference?): CharSequence? {
        return when (preference?.key) {
            getString(R.string.background_color) -> preference.entry
            getString(R.string.night_mode) -> preference.entry
            else -> "Unknown Preference"
        }
    }


    override fun onDestroy() {
        super.onDestroy()
        myPreferenceManager.unregisterListener(this)
    }


    class SettingsFragment : PreferenceFragmentCompat() {
        override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
            setPreferencesFromResource(R.xml.preference_screen, rootKey)
        }
    }

    private fun setBackgroundColor(color: String) {
        ui.layout.setBackgroundColor(Color.parseColor(color))

    }

}