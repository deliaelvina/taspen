package com.ifcasoftware.urban;

import android.app.Application;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.react.ReactApplication;
import com.chirag.RNMail.RNMail;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.wonday.orientation.OrientationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.wonday.pdf.RCTPdfView;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNMail(),
          new RNFirebasePackage(),
          new RNFirebaseAuthPackage(),
          new RNGoogleSigninPackage(),
          new PickerPackage(),
          new RNDeviceInfo(),
          new AsyncStoragePackage(),
          new ReanimatedPackage(),
          new OrientationPackage(),
          new RNFetchBlobPackage(),
          new RCTPdfView(),
          new RNGestureHandlerPackage(),
          new VectorIconsPackage(),
          new LinearGradientPackage(),
          new SvgPackage(),
          new LinearGradientPackage(),
          new RNCWebViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
