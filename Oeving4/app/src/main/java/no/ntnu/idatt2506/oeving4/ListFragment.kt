package no.ntnu.idatt2506.oeving4

import android.content.Context
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.ListView
import androidx.fragment.app.ListFragment

class ListFragment : ListFragment() {
    private var mListener: OnFragmentInteractionListener? = null


    private var movies: Array<String> = arrayOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        movies = resources.getStringArray(R.array.titles)
        listAdapter = activity?.let {
            ArrayAdapter(it, android.R.layout.simple_list_item_1, movies)
        }
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        mListener = try {
            activity as OnFragmentInteractionListener
        } catch (e: ClassCastException) {
            throw ClassCastException(
                "$activity must implement OnFragmentInteractionListener"
            )
        }
    }
    override fun onDetach() {
        super.onDetach()
        mListener = null
    }

    override fun onListItemClick(l: ListView, v: View, position: Int, id: Long) {
        mListener!!.onFragmentInteraction(position)
    }


    interface OnFragmentInteractionListener {
        fun onFragmentInteraction(position: Int?)
    }
}