﻿using System.Runtime.Serialization;

namespace todo_backend.Controllers
{
    [Serializable]
    internal class HttpResponseException : Exception
    {
        private HttpResponseMessage response;

        public HttpResponseException()
        {
        }

        public HttpResponseException(HttpResponseMessage response)
        {
            this.response = response;
        }

        public HttpResponseException(string? message) : base(message)
        {
        }

        public HttpResponseException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected HttpResponseException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}