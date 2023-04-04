package com.brentvatne.exoplayer;

import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedInputStream;
import java.net.URL;

import cz.msebera.android.httpclient.HttpResponse;
import cz.msebera.android.httpclient.client.methods.HttpGet;
import cz.msebera.android.httpclient.impl.client.CloseableHttpClient;
import cz.msebera.android.httpclient.impl.client.HttpClients;

public class ApacheApi extends AsyncTask<String, Void, HttpResponse> {
    CloseableHttpClient httpclient = HttpClients.createDefault();
    private Exception exception;

    protected HttpResponse doInBackground(String... urls) {
        try {
            String url = urls[0];
            HttpGet httpget = new HttpGet(url);
            HttpResponse httpresponse = httpclient.execute(httpget);
            return httpresponse;
        } catch (Exception e) {
            this.exception = e;

            return null;
        } finally {
            return null;
        }
    }

}
