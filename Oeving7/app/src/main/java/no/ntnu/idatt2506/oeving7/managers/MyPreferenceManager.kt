package no.ntnu.idatt2506.oeving7.managers

import android.content.SharedPreferences
import android.graphics.Color
import android.util.Log
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.graphics.blue
import androidx.preference.PreferenceManager
import no.ntnu.idatt2506.oeving7.R

class MyPreferenceManager(private val activity: AppCompatActivity) {
    private val resources = activity.resources
    private val preferences = PreferenceManager.getDefaultSharedPreferences(activity)
    private val editor: SharedPreferences.Editor = preferences.edit()

    fun getString(key: String, defaultValue: String): String {
        return preferences.getString(key, defaultValue) ?: defaultValue
    }
    fun updateBackgroundColor(callback: (color: String) -> Unit) {

        val backgroundColorValues = resources.getStringArray(R.array.color_values)
        val value = getString(
            resources.getString(R.string.background_color),
            resources.getString(R.string.background_color_default_value)
        )


        when (value) {
            backgroundColorValues[0] -> callback(backgroundColorValues[0])
            backgroundColorValues[1] -> callback(backgroundColorValues[1])
            backgroundColorValues[2] -> callback(backgroundColorValues[2])
            backgroundColorValues[3] -> callback(backgroundColorValues[3])
        }
    }



    fun updateNightMode() {
        val darkModeValues =
            resources.getStringArray(R.array.night_mode_values)
        val value = preferences.getString(
            resources.getString(R.string.night_mode),
            resources.getString(R.string.night_mode_default_value)
        )
        when (value) {
            darkModeValues[0] ->
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
            darkModeValues[1] ->
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            darkModeValues[2] ->
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            darkModeValues[3] ->
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_AUTO_BATTERY)
        }
    }



    fun registerListener(activity: SharedPreferences.OnSharedPreferenceChangeListener) {
        preferences.registerOnSharedPreferenceChangeListener(activity)
    }

    fun unregisterListener(activity: SharedPreferences.OnSharedPreferenceChangeListener) {
        preferences.unregisterOnSharedPreferenceChangeListener(activity)
    }

}
