package com.siraan.storeapp;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import android.widget.ImageView;
import androidx.annotation.Nullable;
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends NavigationActivity {
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
   }
  
  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setSplashLayout();
  }

  private void setSplashLayout() {
    ImageView img = new ImageView(this);
    img.setImageDrawable(getDrawable(R.mipmap.ic_splash));
      img.setScaleType(ImageView.ScaleType.FIT_XY);
    setContentView(img);
  }
}
