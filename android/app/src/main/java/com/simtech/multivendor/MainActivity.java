package com.simtech.multivendor;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import android.widget.ImageView;
import androidx.annotation.Nullable;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setSplashLayout();
  }

  private void setSplashLayout() {
    ImageView img = new ImageView(this);
    img.setImageDrawable(getDrawable(R.mipmap.ic_splash));
    setContentView(img);
  }
}
