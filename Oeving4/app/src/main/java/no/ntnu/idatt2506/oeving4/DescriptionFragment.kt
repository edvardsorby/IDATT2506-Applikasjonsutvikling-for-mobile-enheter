package no.ntnu.idatt2506.oeving4

import android.content.res.TypedArray
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment

class DescriptionFragment : Fragment() {
    private var imageArray: TypedArray? = null
    private var descArray: Array<String> = arrayOf()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ) : View? {

        imageArray = resources.obtainTypedArray(R.array.posters)
        descArray = resources.getStringArray(R.array.descriptions)

        return inflater.inflate(R.layout.fragment_description, container, false);
    }


    fun changePoster(position: Int?) {
        val index: Int = position?:0

        val image = imageArray!!.getDrawable(index)

        (requireView().findViewById<View>(R.id.imageView) as ImageView).setImageDrawable(image)
        requireView().findViewById<TextView>(R.id.textView).text = descArray[index]
    }
}